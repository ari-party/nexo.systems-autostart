import ky from 'ky';

import { env } from '@/env';
import { log } from '@/pino';
import { baseHeaders } from '@/utils/baseHeaders';

export type Status = 'running' | 'stopped' | 'unknown';

export class Server {
  public uuid: string;

  private lastStartInvocation: number = 0;

  constructor(uuid: string) {
    this.uuid = uuid;

    log.debug(`Constructed server ${uuid}`);
  }

  async checkStatus(): Promise<Status> {
    const response = await ky.get(
      new URL(`v1/server/${this.uuid}/status`, env.API_URL),
      {
        throwHttpErrors: false,
        headers: {
          ...baseHeaders,
        },
      },
    );
    if (!response.ok) return 'unknown';

    const body = await response
      .json<{
        state: 'success' | string;
        message: string;
        statusCode: 'server_state' | unknown;
        data: Record<string, unknown> & {
          status: 'running' | 'stopped';
        };
      }>()
      .catch(() => null);
    if (!body) return 'unknown';
    if (body.state !== 'success') return 'unknown';
    if (body.statusCode !== 'server_state') return 'unknown';

    return body.data.status;
  }

  async startServer(): Promise<boolean> {
    const response = await ky.post(
      new URL(`v1/server/${this.uuid}/start`, env.API_URL),
      {
        throwHttpErrors: false,
        headers: {
          ...baseHeaders,
        },
      },
    );

    if (response.ok) log.info(`${this.uuid} started`);
    else
      log.error(
        `${this.uuid} failed to start: ${response.statusText} (${response.status})`,
      );

    return response.ok;
  }

  async check() {
    const status = await this.checkStatus();
    log.debug(`${this.uuid} status: ${status}`);

    if (status !== 'stopped') return;

    const now = Date.now();
    // only attempt to start every minute
    if (now - this.lastStartInvocation < 60_000) return;

    log.info(`${this.uuid} is stopped, attempting to start`);

    return this.startServer();
  }
}
