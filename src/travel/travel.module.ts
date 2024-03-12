import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import {
  TravelRecipeEntity,
  ElementTravelEntity,
  PhotoEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity,
  ElementTravelLocallyEntity,
  ElementTravelGloballyEntity,
} from '../resources'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
import { ActivityModule } from '../activity/activity.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelRecipeEntity, ElementTravelEntity,
      TravelInstanceEntity, ElementTravelInstanceEntity,
      PhotoEntity, ElementTravelLocallyEntity,
      ElementTravelGloballyEntity,
    ]),
    CloudinaryModule,
    ActivityModule,
  ],
  controllers: [TravelController],
  providers: [TravelService, Logger],
})
export class TravelModule {}
