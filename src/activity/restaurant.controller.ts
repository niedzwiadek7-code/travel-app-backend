import {
  Body, Controller, Param, Post, Put, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { RestaurantDto } from './dto'
import { GetUser } from '../auth/decorator'
import { RestaurantFormat } from './types'
import { ActivityService } from './activity.service'

@Controller('activity/restaurant')
export class RestaurantController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser('id') userId: number,
      @Body() body: RestaurantDto,
  ): Promise<RestaurantFormat> {
    return this.activityService.put<RestaurantFormat>(
      body,
      userId,
      'Restaurant',
    )
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @GetUser('id') userId: number,
      @Body() body: RestaurantDto,
      @Param('id') id: number,
  ): Promise<RestaurantFormat> {
    return this.activityService.put<RestaurantFormat>(
      body,
      userId,
      'Restaurant',
      id,
    )
  }
}
