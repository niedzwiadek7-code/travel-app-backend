/* eslint-disable global-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in,no-restricted-syntax */

import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

const dataToSeedMap = {
  place: require('./data/place.json'),
}

async function main() {
  dotenv.config()

  for (const object in dataToSeedMap) {
    const data = dataToSeedMap[object]

    for (const dataObj of data) {
      await prisma.place.create({ data: dataObj })
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
