import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ActivityEntity, RestaurantEntity,
} from '../resources'
import { RestaurantFormat, ActivityFormat } from './types'
import { RestaurantDto } from './dto'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  transformRestaurant(result: ActivityEntity, activityObj: ActivityFormat): RestaurantFormat {
    return {
      ...activityObj,
      place: result.restaurant.place,
    }
  }

  async createEntity(
    body: RestaurantDto,
    activity: ActivityEntity,
    activityId?: number,
  ): Promise<ActivityEntity> {
    const activityTemp = { ...activity }

    activityTemp.restaurant = this.restaurantRepository.create({
      activityId,
      place: body.place,
    })

    return this.activityRepository.save(activityTemp)
  }
}
