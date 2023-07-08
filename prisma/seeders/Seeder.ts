/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in,no-restricted-syntax */

import { PrismaClient } from '@prisma/client'
import Faker from './fakers/FakerInterface'

class Seeder {
  data: Record<string, any>

  fakers: Record<string, Faker>

  prisma: PrismaClient

  constructor(
    data: Record<string, any>,
    getFakers: (prisma: PrismaClient) => Record<string, Faker>,
    prisma: PrismaClient,
  ) {
    this.data = data
    this.fakers = getFakers(prisma)
    this.prisma = prisma
  }

  async pushData() {
    for (const object in this.data) {
      const data = this.data[object]
      const promises = Promise.all(
        data.map(
          (dataObj) => this.prisma[object].create({ data: dataObj }),
        ),
      )
      await promises
    }
  }

  async runFakers() {
    for (const object in this.fakers) {
      const faker = this.fakers[object]
      const data = await faker.generate(25)

      const promises = Promise.all(
        data.map(
          (dataObj) => this.prisma[object].create({ data: dataObj }),
        ),
      )
      await promises
    }
  }

  async truncateTable() {
    const deletePromises = Promise.all([
      this.prisma.elementTravelPhoto.deleteMany(),
      this.prisma.elementTravelInstance.deleteMany(),
      this.prisma.travelInstance.deleteMany(),
      this.prisma.answer.deleteMany(),
      this.prisma.question.deleteMany(),
      this.prisma.categoryRating.deleteMany(),
      this.prisma.rating.deleteMany(),
      this.prisma.price.deleteMany(),
      this.prisma.elementTravel.deleteMany(),
      this.prisma.travelRecipe.deleteMany(),
      this.prisma.activityTypeParameter.deleteMany(),
      this.prisma.activityParameter.deleteMany(),
      this.prisma.place.deleteMany(),
      this.prisma.activity.deleteMany(),
      this.prisma.activityType.deleteMany(),
      this.prisma.user.deleteMany(),
      this.prisma.dateRange.deleteMany(),
    ])

    await deletePromises
  }

  async seed() {
    // await this.truncateTable()
    await this.pushData()
    await this.runFakers()
  }
}

export default Seeder
