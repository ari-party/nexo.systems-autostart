import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('production'),

    API_URL: z
      .string()
      .default('https://nexo.systems/api')
      .transform((v) => (!v.endsWith('/') ? `${v}/` : v)),
    SESSION_TOKEN: z.string(),
    SERVER_IDS: z
      .string()
      .default('')
      .transform((v) => v.trim().split(',')),
    CHECK_INTERVAL: z
      .string()
      .default('15')
      .transform((v) => parseInt(v, 10))
      .pipe(z.number()),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
