import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import * as path from 'path';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from '../modules/users/user.entity';

const logger = new Logger('MikroORM');
const mikroOrmConfig: Options = {
  entities: [User],
  dbName: process.env.DATABASE_NAME,
  type: 'postgresql',
  port: Number(process.env.DATABASE_PORT),
  debug: true,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  cache: {
    enabled: false,
  },
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
    disableForeignKeys: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
};

export default mikroOrmConfig;
