import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import * as fs from 'fs/promises'
import * as path from 'path'
import {
  AccommodationEntity,
  ActivityEntity, AttractionEntity, PriceEntity, RestaurantEntity, TripEntity, UserEntity,
} from '../../resources'

interface JsonActivity {
  accepted: boolean;
  name: string
  description: string
  activityType: 'Accommodation' | 'Attraction' | 'Trip' | 'Restaurant'
  prices: { price: number }[]
  userId: number
  accommodation?: { place: string }
  attraction?: { place: string, priceType: 'per_hour' | 'per_entry' }
  restaurant?: { place: string }
  trip?: { from: string, to: string }
  deleteAt?: Date
}

@Injectable()
export class ActivitySeederService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccommodationEntity)
    private readonly accommodationRepository: Repository<AccommodationEntity>,
    @InjectRepository(AttractionEntity)
    private readonly attractionRepository: Repository<AttractionEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    private dataSource: DataSource,
  ) {}

  async seed() {
    await this.resetActivities()

    const jsonPath = path.join(__dirname, 'initialData', 'activities.json')
    await this.seedFromJson(jsonPath)

    if (process.env.WITH_FACTORY !== 'true') {
      return
    }

    const count = (parseInt(process.env.FACTORY_SIZE, 10) || 1) * 5

    const promises = []

    for (let i = 0; i < count; i += 1) {
      promises.push(this.generateActivity())
    }

    await Promise.all(promises)
  }

  async resetActivities() {
    await this.dataSource.query(`TRUNCATE TABLE ${process.env.DATABASE_SCHEMA}.activity RESTART IDENTITY CASCADE;`)
  }

  async seedFromJson(filePath: string) {
    try {
      const rawData = await fs.readFile(filePath, 'utf8')
      const data: JsonActivity[] = JSON.parse(rawData)

      const promises = []

      const createActivity = (activityData: JsonActivity) => {
        const activity = new ActivityEntity()
        activity.accepted = activityData.accepted
        activity.name = activityData.name
        activity.description = activityData.description
        activity.activityType = activityData.activityType
        activity.prices = activityData.prices.map((price) => this.priceRepository.create(price))
        activity.userId = activityData.userId

        if (activityData.deleteAt) {
          activity.deleteAt = activityData.deleteAt
        }

        if (activityData.activityType === 'Accommodation') {
          activity.accommodation = this.accommodationRepository.create(activityData.accommodation)
        }

        if (activityData.activityType === 'Attraction') {
          activity.attraction = this.attractionRepository.create(activityData.attraction)
        }

        if (activityData.activityType === 'Restaurant') {
          activity.restaurant = this.restaurantRepository.create(activityData.restaurant)
        }

        if (activityData.activityType === 'Trip') {
          activity.trip = this.tripRepository.create(activityData.trip)
        }

        return this.activityRepository.save(activity)
      }

      data.forEach((activityData) => {
        promises.push(createActivity(activityData))
      })

      await Promise.all(promises)
    } catch (err) {
      console.error(err)
    }
  }

  async generateActivity() {
    const activity = new ActivityEntity()
    activity.accepted = faker.datatype.boolean()

    activity.name = faker.lorem.words({
      min: 1,
      max: 5,
    })

    activity.description = faker.lorem.paragraph({
      min: 0,
      max: 10,
    })

    const activityType = faker.helpers.arrayElement([
      'Restaurant',
      'Attraction',
      'Trip',
      'Accommodation',
    ])

    activity.activityType = activityType

    activity.prices = [this.priceRepository.create({
      price: faker.number.int({
        min: 1,
        max: 1000,
      }),
    })]

    const userIds = await this.userRepository.find({
      select: ['id'],
    })

    activity.userId = faker.helpers.arrayElement(userIds).id

    switch (activityType) {
      case 'Accommodation':
        activity.accommodation = this.accommodationRepository.create({
          place: faker.location.city(),
        })
        break
      case 'Attraction':
        activity.attraction = this.attractionRepository.create({
          place: faker.location.city(),
          priceType: faker.helpers.arrayElement(['per_hour', 'per_entry']),
        })
        break
      case 'Restaurant':
        activity.restaurant = this.restaurantRepository.create({
          place: faker.location.city(),
        })
        break
      case 'Trip':
        activity.trip = this.tripRepository.create({
          from: faker.location.city(),
          to: faker.location.city(),
        })
        break
      default:
        break
    }

    if (faker.datatype.boolean(0.2)) {
      activity.deleteAt = faker.date.anytime()
    }

    return this.activityRepository.save(activity)
  }
}
