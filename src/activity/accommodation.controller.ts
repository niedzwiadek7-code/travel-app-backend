import {
  Body, Controller, Param, Post, Put, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { AccommodationDto } from './dto'
import { GetUser } from '../auth/decorator'
import { AccommodationFormat } from './types'
import { ActivityService } from './activity.service'

@Controller('activity/accommodation')
export class AccommodationController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser('id') userId: number,
      @Body() body: AccommodationDto,
  ): Promise<AccommodationFormat> {
    return this.activityService.put<AccommodationFormat>(
      body,
      userId,
      'Accommodation',
    )
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @GetUser('id') userId: number,
      @Body() body: AccommodationDto,
      @Param('id') id: string,
  ): Promise<AccommodationFormat> {
    return this.activityService.put<AccommodationFormat>(
      body,
      userId,
      'Accommodation',
      parseInt(id, 10),
    )
  }
}
