import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DRIZZLE } from './database.constants';
import * as schema from './schema';

const POOL = Symbol('PG_POOL');

@Global()
@Module({
  providers: [
    {
      provide: POOL,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) =>
        new Pool({ connectionString: cfg.getOrThrow<string>('DATABASE_URL') }),
    },
    {
      provide: DRIZZLE,
      inject: [POOL],
      useFactory: (pool: Pool) => drizzle(pool, { schema }),
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(/* inject pool here if you want explicit close */) {}
  async onApplicationShutdown() {
    /* pool.end() — see repo for full impl */
  }
}
