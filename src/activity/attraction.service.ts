import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AttractionFormat, ActivityFormat } from './types'
import {
  ActivityEntity, AttractionEntity, PriceEntity,
} from '../resources'
import { AttractionDto } from './dto'

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(AttractionEntity)
    private readonly attractionRepository: Repository<AttractionEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  transformAttraction(result: ActivityEntity, activityObj: ActivityFormat): AttractionFormat {
    return {
      ...activityObj,
      place: result.attraction.place,
      priceType: result.attraction.priceType,
    }
  }

  async createEntity(
    body: AttractionDto,
    activity: ActivityEntity,
    activityId?: number,
  ): Promise<ActivityEntity> {
    const activityTemp = { ...activity }

    activityTemp.attraction = this.attractionRepository.create({
      activityId,
      place: body.place,
      priceType: body.priceType,
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
