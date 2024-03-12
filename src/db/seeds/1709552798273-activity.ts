// import { DataSource } from 'typeorm'
// import { Seeder, SeederFactoryManager } from 'typeorm-extension'
// import { faker } from '@faker-js/faker'
// import {
//   ActivityEntity,
//   ActivityParameterEntity,
//   ActivityTypeEntity,
//   ActivityTypeParameterEntity,
//   PriceEntity,
//   UserEntity,
// } from '../../resources'
//
// export class Activity1709552798273 implements Seeder {
//   track = false
//
//   public async run(
//     dataSource: DataSource,
//     factoryManager: SeederFactoryManager,
//   ): Promise<any> {
//     await dataSource.query(
//     `TRUNCATE TABLE
//     "${process.env.DATABASE_SCHEMA}"."activity_entity"
//     RESTART IDENTITY CASCADE`
//     )
//     await dataSource.query(
//     `TRUNCATE TABLE
//     "${process.env.DATABASE_SCHEMA}"."price_entity"
//     RESTART IDENTITY CASCADE`
//     )
//
//     const factorySize = process.env.FACTORY_SIZE ? parseInt(process.env.FACTORY_SIZE, 10) : 0
//
//     const userRepository = dataSource.getRepository(UserEntity)
//     const userIds = (await userRepository.find())
//       .map((user) => user.id)
//
//     const activityTypeRepository = dataSource.getRepository(ActivityTypeEntity)
//     const activityTypes = (await activityTypeRepository.find())
//       .map((activityType) => activityType.id)
//
//     const activityTypeParametersRepository =
//     dataSource.getRepository(ActivityTypeParameterEntity)
//     const activityTypeParameters = await activityTypeParametersRepository.find()
//     const activityParametersRepository = dataSource.getRepository(ActivityParameterEntity)
//
//     const activityRepository = dataSource.getRepository(ActivityEntity)
//
//     const activityFactory = factoryManager.get(ActivityEntity)
//     const priceFactory = factoryManager.get(PriceEntity)
//
//     const getRandomProperty = (name: string) => {
//       switch (name) {
//         case 'place':
//         case 'from':
//         case 'to':
//           return faker.location.city()
//         case 'priceType':
//           return faker.helpers.arrayElement(['per_hour', 'per_entry'])
//         default:
//           return faker.word.words(3)
//       }
//     }
//
//     const activities = await Promise.all(
//       Array(factorySize)
//         .fill('')
//         .map(async () => {
//           const made = await activityFactory.make({
//             userId: faker.helpers.arrayElement(userIds).toString(),
//             activityTypeId: faker.helpers.arrayElement(activityTypes).toString(),
//             activityParameters: [],
//             prices: [],
//           })
//
//           const parameters = activityTypeParameters
//             .filter((parameter) => parameter.activityTypeId.toString() === made.activityTypeId)
//
//           await Promise.all(parameters.map(async (type) => {
//             const parameter = activityParametersRepository.create({
//               activityTypeParameterId: type.id.toString(),
//               value: getRandomProperty(type.name),
//             })
//             made.activityParameters.push(parameter)
//           }))
//
//           const countOfPrices = faker.number.int({
//             min: 1,
//             max: 5,
//           })
//
//           await Promise.all(Array(countOfPrices)
//             .fill('')
//             .map(async () => {
//               const price = await priceFactory.make()
//               made.prices.push(price)
//             }))
//
//           return activityRepository.create(made)
//         }),
//     )
//
//     await activityRepository.save(activities)
//   }
// }
