import { Logger } from '@nestjs/common';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Options } from '@mikro-orm/core';

const logger = new Logger('MikroORM');

const mikroOrmConfig = {
  entities: [],
  dbName: process.env.DATABASE_NAME,
  type: 'postgresql',
  port: parseInt(process.env.DATABASE_PORT),
  debug: true,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  cache: {
    enabled: false,
  },
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'database/migrations',
    glob: '!(*.d).{js,ts}',
    disableForeignKeys: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  seeder: {
    path: 'dist/database/seeders',
    pathTs: 'database/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
} as Options;

export default mikroOrmConfig;
