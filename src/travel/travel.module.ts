import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import { TravelRecipeEntity, ElementTravelEntity } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelRecipeEntity, ElementTravelEntity]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
