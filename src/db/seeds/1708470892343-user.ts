import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { UserEntity } from '../../resources'

export class User1708470892343 implements Seeder {
  track = false

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE TABLE "user_entity" RESTART IDENTITY CASCADE')

    const repository = dataSource.getRepository(UserEntity)

    await repository.insert({
      firstName: 'Damian',
      lastName: 'Kliber',
      email: 'damiankliber@gmail.com',
      password: 'haslo123',
    })
  }
}
