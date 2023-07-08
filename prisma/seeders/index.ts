import { PrismaClient } from '@prisma/client'
import data from './data'
import getFakers from './fakers'
import Seeder from './Seeder'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

async function main() {
  dotenv.config()
  const seeder = new Seeder(
    data,
    getFakers,
    prisma,
  )
  await seeder.seed()
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
