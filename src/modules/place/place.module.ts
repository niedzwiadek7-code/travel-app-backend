import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlaceController } from './place.controller'
import { PlaceService } from './place.service'
import { Place } from '../../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
