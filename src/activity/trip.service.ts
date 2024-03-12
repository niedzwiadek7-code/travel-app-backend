import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ActivityEntity, PriceEntity, TripEntity,
} from '../resources'
import { TripFormat, ActivityFormat } from './types'
import { TripDto } from './dto'

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  transformTrip(result: ActivityEntity, activityObj: ActivityFormat): TripFormat {
    return {
      ...activityObj,
      from: result.trip.from,
      to: result.trip.to,
    }
  }

  async createEntity(
    body: TripDto,
    activity: ActivityEntity,
    activityId?: number,
  ) {
    const activityTemp = { ...activity }

    activityTemp.trip = this.tripRepository.create({
      activityId,
      from: body.from,
      to: body.to,
    })

    activityTemp.prices = [
      this.priceRepository.create({
        activityId,
        price: body.price,
      }),
    ]

    return this.activityRepository.save(activityTemp)
  }
}
