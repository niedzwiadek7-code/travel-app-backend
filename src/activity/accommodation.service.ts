import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  AccommodationEntity, ActivityEntity, PriceEntity,
} from '../resources'
import { AccommodationFormat, ActivityFormat } from './types'
import { AccommodationDto } from './dto'

// TODO: maybe all types should be in the activity service
// in activityTypeService you add only props that are specific to the type
// and in the activity service you add the common props

// TODO: you can execute the same activity function in every controller
// or move the common logic to the activity controller

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(AccommodationEntity)
    private readonly accommodationRepository: Repository<AccommodationEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  transformAccommodation(result: ActivityEntity, actualObj: ActivityFormat): AccommodationFormat {
    return {
      ...actualObj,
      place: result.accommodation.place,
    }
  }

  async createEntity(
    body: AccommodationDto,
    activity: ActivityEntity,
    activityId?: number,
  ): Promise<ActivityEntity> {
    const activityTemp = { ...activity }
    activityTemp.accommodation = this.accommodationRepository.create({
      activityId,
      place: body.place,
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
