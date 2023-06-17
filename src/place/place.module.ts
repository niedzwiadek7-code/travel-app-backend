import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlaceController } from './place.controller'
import { PlaceService } from './place.service'
import { PlaceEntity } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceEntity]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
