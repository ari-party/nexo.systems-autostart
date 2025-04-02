import { env } from '@/env';

import type { KyHeadersInit } from 'node_modules/ky/distribution/types/options';

export const baseHeaders = {
  authorization: `Bearer ${env.SESSION_TOKEN}`,
  cookie: `NexoSystems_SESSION=${env.SESSION_TOKEN}`,
} satisfies KyHeadersInit;
