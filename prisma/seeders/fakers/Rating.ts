import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import FakerInterface from './FakerInterface'

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
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
      },
    })

    for (let i = 0; i < count; i += 1) {
      results.push({
        text: faker.word.words({ count: { min: 50, max: 100 } }),
        authorId: faker.helpers.arrayElement(users.map((user) => user.id)),
        activityId: faker.helpers.arrayElement(activities.map((activity) => activity.id)),
      })
    }

    return results
  }
}

export default ActivityFaker
