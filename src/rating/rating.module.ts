import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import {
  ElementTravelInstanceEntity, PhotoEntity,
  RatingEntity,
} from '../resources'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RatingEntity,
        ElementTravelInstanceEntity,
        PhotoEntity,
      ],
    ),
  ],
  controllers: [RatingController],
  providers: [RatingService, Logger, CloudinaryService],
})
export class RatingModule {}
