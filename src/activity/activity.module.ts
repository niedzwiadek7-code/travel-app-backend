import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'
import {
  Accommodation, AccommodationPrice,
  Activity, ActivityParameter, ActivityType, ActivityTypeParameter, Price,
} from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Activity, ActivityType, ActivityTypeParameter, ActivityParameter,
        Price, Accommodation, AccommodationPrice,
      ],
    ),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
