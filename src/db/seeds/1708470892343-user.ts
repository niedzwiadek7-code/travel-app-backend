import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import * as argon from 'argon2'
import { RoleEntity, UserEntity } from '../../resources'

export class User1708470892343 implements Seeder {
  track = false

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`TRUNCATE TABLE "${process.env.DB_SCHEMA}"."user_entity" RESTART IDENTITY CASCADE`)

    const repository = dataSource.getRepository(UserEntity)
    const roleRepository = dataSource.getRepository(RoleEntity)

    const hashPassword = (password: string): Promise<string> => argon.hash(password)

    const getRole = async (role: string): Promise<RoleEntity> => {
      const res = await roleRepository.findOne({ where: { role } })
      if (!res) {
        throw new Error(`Role ${role} not found`)
      }
      const roleEntity = new RoleEntity()
      roleEntity.id = res.id
      roleEntity.role = res.role

      return roleEntity
    }

    await repository.save([
      {
        firstName: 'Damian',
        lastName: 'Kliber',
        email: 'damiankliber@gmail.com',
        password: await hashPassword('haslo123'),
        roles: [
          await getRole('user'),
        ],
      },
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@travelapp.com',
        password: await hashPassword('admin123'),
        roles: [
          await getRole('user'),
          await getRole('admin'),
        ],
      },
    ])

    // const userFactory = factoryManager.get(UserEntity)
    // await userFactory.saveMany(5)
  }
}
