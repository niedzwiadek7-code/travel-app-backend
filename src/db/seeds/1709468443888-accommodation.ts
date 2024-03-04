import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { faker } from '@faker-js/faker'
import { AccommodationEntity, AccommodationPriceEntity, UserEntity } from '../../resources'

export class Accommodation1709468443888 implements Seeder {
  track = false

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`TRUNCATE TABLE "${process.env.DATABASE_SCHEMA}"."accommodation_entity" RESTART IDENTITY CASCADE`)
    await dataSource.query(`TRUNCATE TABLE "${process.env.DATABASE_SCHEMA}"."accommodation_price_entity" RESTART IDENTITY CASCADE`)

    const factorySize = process.env.FACTORY_SIZE ? parseInt(process.env.FACTORY_SIZE, 10) : 0

    const userRepository = dataSource.getRepository(UserEntity)
    const userIds = (await userRepository.find({
      select: ['id'],
    })).map((user) => user.id)
    const accommodationsRepository = dataSource.getRepository(AccommodationEntity)
    const accommodationPricesRepository = dataSource.getRepository(AccommodationPriceEntity)

    const accommodationFactory = factoryManager.get(AccommodationEntity)
    const accommodationPriceFactory = factoryManager.get(AccommodationPriceEntity)

    const accommodations = await Promise.all(
      Array(factorySize)
        .fill('')
        .map(async () => {
          const made = await accommodationFactory.make({
            userId: faker.helpers.arrayElement(userIds).toString(),
          })
          return accommodationsRepository.create(made)
        }),
    )

    const result = await accommodationsRepository.save(accommodations)

    const prices = (await Promise.all(result.map(async (accommodation) => {
      const countOfPrices = faker.datatype.number({
        min: 1,
        max: 5,
      })
      return Promise.all(Array(countOfPrices)
        .fill('')
        .map(async () => {
          const price = await accommodationPriceFactory.make({
            accommodationId: accommodation.id.toString(),
          })
          return accommodationPricesRepository.create(price)
        }))
    }))).flat()

    await accommodationPricesRepository.save(prices)
  }
}
