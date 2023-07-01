/* eslint-disable global-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in,no-restricted-syntax */

import { PrismaClient } from '@prisma/client'
import DateRangeFaker from './fakers/DateRange'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

const dataToSeedMap = {
  place: require('./data/place.json'),
}


const fakersToSeedMap = {

}

async function main() {
  dotenv.config()

  const res = await prisma.place.findMany({
    select: {
      id: true,
    },
  })

  console.log(res)

  // data from files
  // for (const object in dataToSeedMap) {
  //   const data = dataToSeedMap[object]
  //
  //   for (const dataObj of data) {
  //     await prisma[object].create({ data: dataObj })
  //   }
  // }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

// const dateRangeFaker = new DateRangeFaker()
// console.log(dateRangeFaker.generate(3))
