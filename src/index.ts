import interval from 'interval-promise';

import { env } from '@/env';
import { Server } from '@/models/server';
import { log } from '@/pino';

for (const serverId of env.SERVER_IDS) {
  const server = new Server(serverId);

  interval(async () => {
    await server.check();
  }, env.CHECK_INTERVAL * 1_000);
}

log.info(`Watching ${env.SERVER_IDS.length} server(s)`);
