import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

const ormConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [
    'dist/resources/**/*.entity.js',
  ],
  schema: process.env.DATABASE_SCHEMA,
  migrationsTableName: 'migrations',
  migrations: [
    'src/db/migrations/*.js',
  ],
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
  ssl: process.env.ENV === 'development' ? false : {},
}

const datasource = new DataSource(ormConfig)
datasource.initialize()
export default datasource
