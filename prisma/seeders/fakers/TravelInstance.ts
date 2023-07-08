/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as dayjs from 'dayjs'
import FakerInterface from './FakerInterface'

class TravelInstanceFaker implements FakerInterface {
  prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async generate(count: number) {
    const results = []
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
      },
    })
    const travelRecipes = await this.prisma.travelRecipe.findMany({
      select: {
        id: true,
      },
    })

    const createElements = async (travelRecipe: any, startDate: string) => {
      const { travelElements } = travelRecipe

      const elementsResult = []
      for (const travelElement of travelElements) {
        const datePart = dayjs(`${startDate}`).add(travelElement.dayNumber).format('YYYY-MM-DD')
        const dateRange = await this.prisma.dateRange.create({
          data: {
            from: dayjs(`${datePart} ${dayjs(travelElement.timeRange.from).format('HH:mm')}`).toISOString(),
            to: dayjs(`${datePart} ${dayjs(travelElement.timeRange.from).format('HH:mm')}`).toISOString(),
          },
        })

        elementsResult.push({
          activityId: travelElement.activityId,
          dataRangeId: dateRange.id,
        })
      }

      return elementsResult
    }

    for (let i = 0; i < count; i += 1) {
      const travelRecipeId = faker.helpers.arrayElement(
        travelRecipes.map((travelRecipe) => travelRecipe.id),
      )

      const travelRecipe = await this.prisma.travelRecipe.findFirst({
        where: {
          id: travelRecipeId,
        },
        include: {
          travelElements: {
            include: {
              timeRange: true,
            },
          },
        },
      })

      const startDate = dayjs(faker.date.past({ years: 2 })).format('YYYY-MM-DD')

      results.push({
        userId: faker.helpers.arrayElement(users.map((user) => user.id)),
        startDate: dayjs(startDate).toISOString(),
        travelRecipeId,
        travelInstanceElements: {
          createMany: {
            data: await createElements(travelRecipe, startDate),
          },
        },
      })
    }

    return results
  }
}

export default TravelInstanceFaker
