import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import {
  AccommodationElementTravelInstance, AccommodationRating, ElementTravelInstance, Rating,
} from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Rating, AccommodationRating, ElementTravelInstance,
        AccommodationElementTravelInstance,
      ],
    ),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
