import {
  Body, Controller, Param, Post, Put, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { TripDto } from './dto'
import { GetUser } from '../auth/decorator'
import { TripFormat } from './types'
import { ActivityService } from './activity.service'

@Controller('activity/trip')
export class TripController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser('id') userId: number,
      @Body() body: TripDto,
  ): Promise<TripFormat> {
    return this.activityService.put<TripFormat>(body, userId, 'Trip')
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @GetUser('id') userId: number,
      @Body() body: TripDto,
      @Param('id') id: string,
  ): Promise<TripFormat> {
    return this.activityService.put<TripFormat>(
      body,
      userId,
      'Trip',
      parseInt(id, 10),
    )
  }
}
