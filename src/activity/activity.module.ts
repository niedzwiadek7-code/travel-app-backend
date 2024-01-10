import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'
import {
  Accommodation, AccommodationPrice, AccommodationRating,
  Activity, ActivityParameter, ActivityType, ActivityTypeParameter, Price, Rating,
} from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Activity, ActivityType, ActivityTypeParameter, ActivityParameter,
        Price, Accommodation, AccommodationPrice, Rating, AccommodationRating,
      ],
    ),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
