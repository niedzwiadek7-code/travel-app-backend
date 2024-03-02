import { Logger, Module } from '@nestjs/common'
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
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelRecipeEntity, ElementTravelEntity, AccommodationElementTravelEntity,
      TravelInstanceEntity, ElementTravelInstanceEntity, ElementTravelPhotoEntity,
      AccommodationElementTravelInstanceEntity, AccommodationElementTravelPhotoEntity,
    ]),
    CloudinaryModule,
  ],
  controllers: [TravelController],
  providers: [TravelService, Logger],
})
export class TravelModule {}
