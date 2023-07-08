import { fakerPL as faker } from '@faker-js/faker'
import { PrismaClient, Role } from '@prisma/client'
import * as argon from 'argon2'
import FakerInterface from './FakerInterface'

class UserFaker implements FakerInterface {
  prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async generate(count: number) {
    const results = []
    const password = await argon.hash('haslo123')

    for (let i = 0; i < count; i += 1) {
      results.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password,
        role: Role.USER,
      })
    }

    return results
  }
}

export default UserFaker
