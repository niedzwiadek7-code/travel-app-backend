import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import {
  TravelRecipeEntity,
  ElementTravelEntity,
  AccommodationElementTravelEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity, AccommodationElementTravelInstanceEntity, AccommodationElementTravelPhotoEntity,
} from '../resources'
import { ElementTravelPhotoEntity } from '../resources/element-travel-photo.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelRecipeEntity, ElementTravelEntity, AccommodationElementTravelEntity,
      TravelInstanceEntity, ElementTravelInstanceEntity, ElementTravelPhotoEntity,
      AccommodationElementTravelInstanceEntity, AccommodationElementTravelPhotoEntity,
    ]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
