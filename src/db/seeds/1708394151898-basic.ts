import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import * as process from 'process'
import { ActivityTypeEntity, ActivityTypeParameterEntity, RoleEntity } from '../../resources'

export class Basic1708594151898 implements Seeder {
  track = false

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`TRUNCATE TABLE "${process.env.DATABASE_SCHEMA}"."role_entity" RESTART IDENTITY CASCADE`)
    await dataSource.query(`TRUNCATE TABLE "${process.env.DATABASE_SCHEMA}"."activity_type_entity" RESTART IDENTITY CASCADE`)
    await dataSource.query(`TRUNCATE TABLE "${process.env.DATABASE_SCHEMA}"."activity_type_parameter_entity" RESTART IDENTITY CASCADE`)

    const roleRepository = dataSource.getRepository(RoleEntity)

    await roleRepository.insert([
      { role: 'admin' },
      { role: 'user' },
    ])

    const activityTypeRepository = dataSource.getRepository(ActivityTypeEntity)
    const activityTypeParameterRepository = dataSource.getRepository(ActivityTypeParameterEntity)

    await activityTypeRepository.save([
      {
        name: 'Podróż',
        activityTypeParameters: [
          activityTypeParameterRepository.create({ name: 'from' }),
          activityTypeParameterRepository.create({ name: 'to' }),
        ],
      },
      {
        name: 'Atrakcja',
        activityTypeParameters: [
          activityTypeParameterRepository.create({ name: 'place' }),
          activityTypeParameterRepository.create({ name: 'priceType' }),
        ],
      },
      {
        name: 'Restauracja',
        activityTypeParameters: [
          activityTypeParameterRepository.create({ name: 'place' }),
        ],
      },
    ])
  }
}
