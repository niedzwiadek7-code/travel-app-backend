import {
  HttpStatus, Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, In, Repository } from 'typeorm'
import { getActualPrice, Paginate, PaginateInput } from '../utils'
import { ActivityEntity } from '../resources'
import {
  AccommodationDto,
  ActivityDto, AttractionDto, QueryActivityDto, RestaurantDto, TripDto,
} from './dto'
import { AccommodationService } from './accommodation.service'
import { TripService } from './trip.service'
import { ActivityFormat, ActivityType } from './types'
import { AttractionService } from './attraction.service'
import { RestaurantService } from './restaurant.service'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    private readonly accommodationService: AccommodationService,
    private readonly tripService: TripService,
    private readonly attractionService: AttractionService,
    private readonly restaurantService: RestaurantService,
  ) {}

  transformActivity(result: ActivityEntity): ActivityFormat {
    const getBasicActivity = () => ({
      id: result.id,
      accepted: result.accepted,
      name: result.name,
      activityType: result.activityType,
      description: result.description,
      price: getActualPrice(result.prices || []),
      ratings: result.ratings ? result.ratings.map((resultObj) => {
        const obj = {
          author: resultObj.author,
          text: resultObj.text,
          photos: [],
        }

        if (resultObj.sharePhotos) {
          obj.photos = resultObj.elementTravel.photos.map((photo) => photo.url)
        }

        return obj
      }) : [],
    })

    const activity = getBasicActivity()

    switch (result.activityType) {
      case 'Accommodation':
        return this.accommodationService.transformAccommodation(result, activity)
      case 'Trip':
        return this.tripService.transformTrip(result, activity)
      case 'Attraction':
        return this.attractionService.transformAttraction(result, activity)
      case 'Restaurant':
        return this.restaurantService.transformRestaurant(result, activity)
      default:
        return activity
    }
  }

  getActivityOptions(
    source: QueryActivityDto,
    userId: string,
    types?: ActivityType[],
  ): FindOptionsWhere<ActivityEntity> {
    const whereObj: Record<string, any> = {}

    switch (source) {
      case 'system':
        whereObj.accepted = true
        break
      case 'user':
        whereObj.userId = userId
        break
      case 'toAccept':
        whereObj.accepted = false
        break
      default:
        break
    }

    if (types) {
      whereObj.activityType = In(types)
    }

    return whereObj
  }

  async getActivity(id: string): Promise<ActivityFormat> {
    const result = await this.activityRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      withDeleted: true,
      relations: [
        'prices', 'ratings', 'ratings.author', 'ratings.elementTravel', 'ratings.elementTravel.photos',
        'accommodation', 'trip', 'restaurant', 'attraction',
      ],
    })

    return this.transformActivity(result)
  }

  async getAllActivities(
    source: QueryActivityDto,
    userId: string,
    pagination: PaginateInput,
    types?: ActivityType[],
  ): Promise<Paginate<ActivityFormat>> {
    const whereObj = this.getActivityOptions(source, userId, types)

    const [results, total] = await this.activityRepository.findAndCount({
      where: whereObj,
      relations: [
        'prices', 'ratings', 'ratings.author', 'ratings.elementTravel', 'ratings.elementTravel.photos',
        'accommodation', 'trip', 'restaurant', 'attraction',
      ],
      withDeleted: source === 'user',
      take: pagination.take,
      skip: pagination.skip,
    })

    return new Paginate<ActivityFormat>(
      total,
      results.map(this.transformActivity.bind(this)),
    )
  }

  async put<T extends ActivityFormat>(
    body: ActivityDto,
    userId: number,
    activityType: ActivityType,
    activityId?: number,
  ): Promise<T> {
    const basicEntity = {
      id: activityId,
      accepted: false,
      name: body.name,
      description: body.description,
      activityType,
      userId,
    }

    let activity: ActivityEntity

    switch (activityType) {
      case 'Accommodation':
        activity = await this.accommodationService.createEntity(
          body as AccommodationDto,
          this.activityRepository.create(basicEntity),
          activityId,
        )
        break
      case 'Trip':
        activity = await this.tripService.createEntity(
          body as TripDto,
          this.activityRepository.create(basicEntity),
          activityId,
        )
        break
      case 'Attraction':
        activity = await this.attractionService.createEntity(
          body as AttractionDto,
          this.activityRepository.create(basicEntity),
          activityId,
        )
        break
      case 'Restaurant':
      default:
        activity = await this.restaurantService.createEntity(
          body as RestaurantDto,
          this.activityRepository.create(basicEntity),
          activityId,
        )
        break
    }

    return this.transformActivity(activity) as T
  }

  async acceptActivity(id: string) {
    await this.activityRepository.save({
      id: parseInt(id, 10),
      accepted: true,
    })
    return HttpStatus.OK
  }

  async restoreActivity(id: string) {
    await this.activityRepository.softDelete({ id: parseInt(id, 10) })
    return HttpStatus.ACCEPTED
  }
}
