import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

const ormConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [
    'dist/resources/**/*.entity.js',
  ],
  schema: process.env.DB_SCHEMA,
  migrationsTableName: 'migrations',
  migrations: [
    'src/db/migrations/*.js',
  ],
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
  ssl: process.env.NODE_ENV === 'development' ? false : {},
}

const datasource = new DataSource(ormConfig)
datasource.initialize()
export default datasource
