import {
  Body, Controller, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common'
import { ActivityService } from './activity.service'
import { ActivityDto } from './dto'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('all')
  getAll(
  @Query() all: string,
    @Query('source') source: 'system' | 'user' | 'all',
    @GetUser('id') userId: string,
  ) {
    return this.activityService.getAllActivities(source, userId)
  }

  @UseGuards(JwtGuard)
  @Get('accommodation/all')
  getAllAccommodations(
  @Query('source') source: 'system' | 'user' | 'all',
    @GetUser('id') userId: string,
  ) {
    return this.activityService.getAllAccommodations(source, userId)
  }

  @Get('find/:id')
  get(@Param('id') id: string) {
    return this.activityService.getActivity(id)
  }

  @Get('/accommodation/find/:id')
  getAccommodation(@Param('id') id: string) {
    return this.activityService.getAccommodation(id)
  }

  @Get('get-types')
  getTypes() {
    return this.activityService.getAllActivityTypes()
  }

  @UseGuards(JwtGuard)
  @Post()
  createActivity(
  @GetUser('id') userId: string,
    @Body() body: ActivityDto,
  ) {
    switch (body.activityType) {
      case 'Nocleg':
      case 'accommodation':
        return this.activityService.createAccommodation(body, userId)
        break
      default:
        return this.activityService.createActivity(body, userId)
    }
  }
}
