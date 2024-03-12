import {
  Body, Controller, Param, Post, Put, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { AttractionDto } from './dto'
import { GetUser } from '../auth/decorator'
import { AttractionFormat } from './types'
import { ActivityService } from './activity.service'

@Controller('activity/attraction')
export class AttractionController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @GetUser('id') userId: number,
      @Body() body: AttractionDto,
  ): Promise<AttractionFormat> {
    return this.activityService.put<AttractionFormat>(
      body,
      userId,
      'Attraction',
    )
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @GetUser('id') userId: number,
      @Body() body: AttractionDto,
      @Param('id') id: string,
  ): Promise<AttractionFormat> {
    return this.activityService.put<AttractionFormat>(
      body,
      userId,
      'Attraction',
      parseInt(id, 10),
    )
  }
}
