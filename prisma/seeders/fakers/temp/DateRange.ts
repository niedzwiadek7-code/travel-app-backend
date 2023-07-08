import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import FakerInterface from '../FakerInterface'

class DateRangeFaker implements FakerInterface {
  prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  generate(count: number) {
    const results = []

    for (let i = 0; i < count; i += 1) {
      const from = faker.date.past({ years: 2 })
      const to = faker.date.soon({ days: 20, refDate: from })

      results.push({
        from,
        to,
      })
    }

    return results
  }
}

export default DateRangeFaker
