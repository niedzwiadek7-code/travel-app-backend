import { fa, fakerPL as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import FakerInterface from './FakerInterface'

class QuestionFaker implements FakerInterface {
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

    for (let i = 0; i < count; i += 1) {
      const createAnswers = (countAnswers: number, authorId: number) => {
        const answers = []

        for (let j = 0; j < countAnswers; j += 1) {
          answers.push({
            answer: faker.word.words({ count: { min: 25, max: 150 } }),
            authorId: faker.helpers.arrayElement(
              users
                .map((user) => user.id)
                .filter((id) => id !== authorId),
            ),
          })
        }

        return answers
      }

      const author = faker.helpers.arrayElement(users)

      results.push({
        question: faker.word.words({ count: { min: 10, max: 40 } }),
        activity: {
          connect: faker.helpers.arrayElement(activities),
        },
        author: {
          connect: author,
        },
        answers: {
          createMany: {
            data: createAnswers(faker.number.int({ min: 0, max: 5 }), author.id),
          },
        },
      })
    }

    return results
  }
}

export default QuestionFaker
