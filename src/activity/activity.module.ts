import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'
import {
  AccommodationEntity, AccommodationPriceEntity, AccommodationRatingEntity,
  ActivityEntity, ActivityParameterEntity, ActivityTypeEntity, ActivityTypeParameterEntity, PriceEntity, RatingEntity,
} from '../resources'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ActivityEntity, ActivityTypeEntity, ActivityTypeParameterEntity, ActivityParameterEntity,
        PriceEntity, AccommodationEntity, AccommodationPriceEntity, RatingEntity, AccommodationRatingEntity,
      ],
    ),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
