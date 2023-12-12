import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import {
  TravelRecipe,
  ElementTravel,
  AccommodationElementTravel,
  TravelInstance,
  ElementTravelInstance, AccommodationElementTravelInstance, AccommodationElementTravelPhoto,
} from '../typeorm'
import { ElementTravelPhoto } from '../typeorm/ElementTravelPhoto'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelRecipe, ElementTravel, AccommodationElementTravel,
      TravelInstance, ElementTravelInstance, ElementTravelPhoto,
      AccommodationElementTravelInstance, AccommodationElementTravelPhoto,
    ]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
