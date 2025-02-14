import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import {
  AccommodationEntity,
  ActivityEntity, AttractionEntity, PriceEntity, RestaurantEntity, TripEntity, UserEntity,
} from '../../resources'

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
  ) {}

  async seed() {
    await this.resetActivities()

    const count = (parseInt(process.env.FACTORY_SIZE, 10) || 1) * 5

    const promises = []

    for (let i = 0; i < count; i += 1) {
      promises.push(this.generateActivity())
    }

    await Promise.all(promises)
  }

  async resetActivities() {
    await this.activityRepository.delete({})
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
