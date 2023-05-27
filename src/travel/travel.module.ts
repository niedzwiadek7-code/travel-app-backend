import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'
import { Travel, ElementTravel } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Travel, ElementTravel]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
