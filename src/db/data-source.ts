import { ConfigService } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import entities from '../resources'

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: +configService.get('DATABASE_PORT'),
  database: configService.get('DATABASE_NAME'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  entities,
  synchronize: !(configService.get('ENV') === 'production'),
  schema: configService.get('DATABASE_SCHEMA'),

  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*.js'],
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
  ssl: configService.get('ENV') === 'development' ? false : {},
})
