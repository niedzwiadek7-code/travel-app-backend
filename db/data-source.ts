import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/src/typeorm/*.entity.js'],
  migrations: ['dist/**/*.migration.js'],
  synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
