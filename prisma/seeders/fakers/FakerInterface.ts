import { PrismaClient } from '@prisma/client'

interface Faker {
  prisma: PrismaClient,
  generate(count: number)
}

export default Faker
