import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'
import {
  AccommodationEntity,
  ActivityEntity, AttractionEntity, PriceEntity, RatingEntity, RestaurantEntity, TripEntity,
} from '../resources'
import { AccommodationService } from './accommodation.service'
import { AttractionService } from './attraction.service'
import { TripService } from './trip.service'
import { RestaurantService } from './restaurant.service'
import { AccommodationController } from './accommodation.controller'
import { AttractionController } from './attraction.controller'
import { RestaurantController } from './restaurant.controller'
import { TripController } from './trip.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ActivityEntity,
        AccommodationEntity,
        AttractionEntity,
        TripEntity,
        RestaurantEntity,
        PriceEntity,
        RatingEntity,
      ],
    ),
  ],
  controllers: [
    ActivityController,
    AccommodationController,
    AttractionController,
    RestaurantController,
    TripController,
  ],
  providers: [
    ActivityService,
    AccommodationService,
    AttractionService,
    TripService,
    RestaurantService,
  ],
  exports: [
    ActivityService,
  ],
})
export class ActivityModule {}
