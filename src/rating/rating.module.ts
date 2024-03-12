import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import {
  ElementTravelInstanceEntity,
  RatingEntity,
} from '../resources'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RatingEntity,
        ElementTravelInstanceEntity,
      ],
    ),
  ],
  controllers: [RatingController],
  providers: [RatingService, Logger],
})
export class RatingModule {}
