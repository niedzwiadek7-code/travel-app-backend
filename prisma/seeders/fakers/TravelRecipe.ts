/* eslint-disable no-await-in-loop */

import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as dayjs from 'dayjs'
import FakerInterface from './FakerInterface'

class TravelRecipeFaker implements FakerInterface {
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
    const activities = await this.prisma.activity.findMany({
      select: {
        id: true,
      },
    })

    const createElements = async (countElements: number) => {
      let travelElements = []

      const createElementsPerDay = async (dayNumber: number) => {
        const countElementsPerDay = faker.number.int({ min: 2, max: 3 })
        const travelElementsPerDay = []

        // time between 6 - 23
        const maxIntervalHours = Math.floor((23 - 6) / countElementsPerDay)
        const hours = {
          start: 6,
          end: faker.number.int({ min: 6, max: 6 + maxIntervalHours }),
        }

        const improvementHours = () => {
          hours.start = hours.end
          hours.end = faker.number.int({ min: hours.start + 1, max: hours.end + maxIntervalHours })
        }

        for (let j = 0; j < countElementsPerDay; j += 1) {
          const timeRange = await this.prisma.timeRange.create({
            data: {
              from: dayjs(`1970-01-01 ${hours.start}:00`).toISOString(),
              to: dayjs(`1970-01-01 ${hours.end}:00`).toISOString(),
            },
          })

          improvementHours()

          travelElementsPerDay.push({
            dayNumber,
            activityId: faker.helpers.arrayElement(activities.map((activity) => activity.id)),
            timeRangeId: timeRange.id,
          })
        }

        travelElements = [
          ...travelElements,
          ...travelElementsPerDay,
        ]
      }

      for (let j = 0; j < countElements; j += 1) {
        await createElementsPerDay(j + 1)
      }

      return travelElements
    }

    for (let i = 0; i < count; i += 1) {
      const countDays = faker.number.int({ min: 2, max: 4 })

      results.push({
        name: faker.word.adjective({ length: { min: 5, max: 7 } }),
        ownerId: faker.helpers.arrayElement(users.map((user) => user.id)),
        travelElements: {
          createMany: {
            data: await createElements(countDays),
          },
        },
      })
    }

    return results
  }
}

export default TravelRecipeFaker
