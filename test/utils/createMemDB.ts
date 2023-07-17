import { createConnection, EntitySchema } from 'typeorm'
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

// eslint-disable-next-line @typescript-eslint/ban-types
type Entity = Function | string | EntitySchema<any>

export async function createMemDB(entities: Entity[]) {
  return createConnection({
    type: 'mysql',
    database: ':memory',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  })
}

export const createTestConfiguration = (
  entities: Entity[],
): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory',
  entities,
  dropSchema: true,
  synchronize: true,
  logging: false,
})
