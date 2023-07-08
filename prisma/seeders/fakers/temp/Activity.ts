import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import FakerInterface from '../FakerInterface'

class ActivityFaker implements FakerInterface {
  prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async generate(count: number) {
    const results = []
    const activities = await this.prisma.activityType.findMany({
      select: {
        id: true,
      },
    })

    const createPrices = (countPrices: number) => {
      const startDate = faker.date.past({ years: 2 })

      const createPrice = (date: Date) => {
        return {
          price: parseFloat(faker.finance.amount({ min: 0, max: 1000 })),
          startDate: date,
        }
      }

      const prices = [
        createPrice(startDate),
      ]

      for (let i = 0; i < countPrices - 1; i += 1) {
        prices.push(
          createPrice(faker.date.soon({ days: 100, refDate: prices[i].startDate })),
        )
      }

      return prices
    }

    for (let i = 0; i < count; i += 1) {
      results.push({
        accepted: faker.datatype.boolean(0.9),
        name: faker.word.words({ count: { min: 3, max: 6 } }),
        description: faker.word.words({ count: { min: 50, max: 200 } }),
        activityType: {
          connect: faker.helpers.arrayElement(activities),
        },
        place: {
          create: {
            longitude: faker.location.longitude(),
            latitude: faker.location.latitude(),
            address: faker.location.streetAddress(),
            zipCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: faker.location.country(),
          },
        },
        price: {
          createMany: {
            data: createPrices(3),
          },
        },
      })
    }

    return results
  }
}

export default ActivityFaker
