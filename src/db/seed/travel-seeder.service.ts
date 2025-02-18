import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import * as argon from 'argon2'
import * as path from 'path'
import * as fs from 'fs/promises'
import * as process from 'node:process'
import {
  ActivityEntity,
  ElementTravelEntity,
  ElementTravelGloballyEntity,
  ElementTravelLocallyEntity,
  RoleEntity,
  TravelRecipeEntity,
  UserEntity,
} from '../../resources'
import { DateHandler } from '../../utils'

interface JsonUser {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

@Injectable()
export class TravelSeederService {
  constructor(
    @InjectRepository(TravelRecipeEntity)
    private readonly travelRecipeRepository: Repository<TravelRecipeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    @InjectRepository(ElementTravelEntity)
    private readonly elementTravelRepository: Repository<ElementTravelEntity>,
    @InjectRepository(ElementTravelGloballyEntity)
    private readonly elementTravelGloballyRepository: Repository<ElementTravelGloballyEntity>,
    @InjectRepository(ElementTravelLocallyEntity)
    private readonly elementTravelLocallyRepository: Repository<ElementTravelLocallyEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    await this.resetTravels()

    // const jsonPath = path.join(__dirname, 'initialData', 'users.json')
    // await this.seedFromJson(jsonPath)

    if (process.env.WITH_FACTORY !== 'true') {
      return
    }

    const promises = []

    const count = parseInt(process.env.FACTORY_SIZE, 10) || 1

    for (let i = 0; i < count; i += 1) {
      promises.push(this.generateTravel())
    }

    await Promise.all(promises)
  }

  async resetTravels() {
    await this.dataSource.query(`TRUNCATE TABLE ${process.env.DATABASE_SCHEMA}.travel_recipe RESTART IDENTITY CASCADE;`)
  }

  async hashPassword(password: string): Promise<string> {
    return argon.hash(password)
  }

  // async seedFromJson(filePath: string) {
  //   try {
  //     const rawData = await fs.readFile(filePath, 'utf8')
  //     const usersData: JsonUser[] = JSON.parse(rawData)
  //
  //     const promises = []
  //
  //     const createUser = async (userData: JsonUser) => {
  //       const user = new UserEntity()
  //       user.firstName = userData.firstName
  //       user.lastName = userData.lastName
  //       user.email = userData.email
  //       user.password = await this.hashPassword(userData.password)
  //
  //       user.roles = await Promise.all(
  //         userData.roles.map(
  //           (roleName) => this.roleRepository.findOne({ where: { role: roleName } }),
  //         ),
  //       )
  //
  //       await this.userRepository.save(user)
  //     }
  //
  //     usersData.forEach((userData) => {
  //       promises.push(createUser(userData))
  //     })
  //
  //     await Promise.all(promises)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  async generateAccommodations(
    countDays: number,
  ) {
    const accommodations = []

    const allAccommodationIds = (await this.activityRepository.find({
      where: {
        activityType: 'Accommodation',
      },
      select: ['id'],
    })).map((activity) => activity.id)

    let day = 1

    while (day <= countDays) {
      const accommodation = new ElementTravelEntity()

      const elementTravelGlobally = new ElementTravelGloballyEntity()
      elementTravelGlobally.from = day

      const to = faker.number.int({
        min: day + 1,
        max: countDays,
      })
      day = to + 1
      elementTravelGlobally.to = to

      accommodation.elementTravelGlobally = this.elementTravelGloballyRepository.create(
        elementTravelGlobally,
      )

      accommodation.activityId = faker.helpers.arrayElement(allAccommodationIds)

      // eslint-disable-next-line no-await-in-loop
      const activity = await this.activityRepository.findOne({
        where: {
          id: accommodation.activityId,
        },
      })
      accommodation.price = activity.prices[0].price
        * (elementTravelGlobally.to - elementTravelGlobally.from + 1)

      accommodation.numberOfPeople = faker.number.int({
        min: 1,
        max: 4,
      })

      accommodation.description = faker.lorem.paragraph()

      accommodations.push(accommodation)
    }

    return accommodations
  }

  async generateTravelElementsPerDay(
    dayCount: number,
  ) {
    const countOfActivities = faker.number.int({
      min: 1,
      max: 5,
    })

    const allActivityIds = (await this.activityRepository.find({
      select: ['id'],
      where: [
        {
          activityType: 'Trip',
        },
        {
          activityType: 'Attraction',
        },
        {
          activityType: 'Restaurant',
        },
      ],
    })).map((activity) => activity.id)

    const travelElements = []

    for (let i = 0; i < countOfActivities; i += 1) {
      const fromTotal = faker.number.int({
        min: 0,
        max: 1438,
      })
      const toTotal = faker.number.int({
        min: fromTotal + 1,
        max: 1439,
      })

      const formatTime = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return new DateHandler(`${hours}:${minutes}`).format('HH:mm')
      }

      const elementTravelLocally = new ElementTravelLocallyEntity()
      elementTravelLocally.dayCount = dayCount
      // elementTravelLocally.from = formatTime(fromTotal)
    }
  }

  async generateTravel() {
    const travelRecipe = new TravelRecipeEntity()
    travelRecipe.name = faker.lorem.words()

    const allUserIds = (await this.userRepository.find({
      select: ['id'],
    })).map((user) => user.id)
    travelRecipe.userId = faker.helpers.arrayElement(allUserIds).toString()

    travelRecipe.countDays = faker.number.int({
      min: 3,
      max: 10,
    })

    const travelElements = [
      ...(await this.generateAccommodations(travelRecipe.countDays)),
    ]
  }
}
