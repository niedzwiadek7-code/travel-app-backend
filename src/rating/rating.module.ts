import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import {
  AccommodationElementTravelInstanceEntity, AccommodationRatingEntity, ElementTravelInstanceEntity, RatingEntity,
} from '../resources'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RatingEntity, AccommodationRatingEntity, ElementTravelInstanceEntity,
        AccommodationElementTravelInstanceEntity,
      ],
    ),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
