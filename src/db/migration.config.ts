import { DataSource, DataSourceOptions } from 'typeorm'

const ormConfig: DataSourceOptions = {
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
    'src/migrations/*.ts',
  ],
}

const datasource = new DataSource(ormConfig)
datasource.initialize()
export default datasource
