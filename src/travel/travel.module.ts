import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import { TravelRecipe, ElementTravel } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelRecipe, ElementTravel]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
