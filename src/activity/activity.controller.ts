import {
  Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards,
} from '@nestjs/common'
import { ActivityService } from './activity.service'
import { ActivityDto, QueryActivity } from './dto'
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
    @Query('source') source: QueryActivity,
    @GetUser('id') userId: string,
  ) {
    return this.activityService.getAllActivities(source, userId)
  }

  @UseGuards(JwtGuard)
  @Get('accommodation/all')
  getAllAccommodations(
  @Query('source') source: QueryActivity,
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
      default:
        return this.activityService.createActivity(body, userId)
    }
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  putActivity(
  @Param('id') id: string,
    @Body() body: ActivityDto,
  ) {
    switch (body.activityType) {
      case 'Nocleg':
      case 'accommodation':
        return this.activityService.putAccommodation(id, body)
      default:
        return this.activityService.putActivity(id, body)
    }
  }

  @UseGuards(JwtGuard)
  @Post('accept/:id')
  acceptActivity(
  @Param('id') id: string,
  ) {
    return this.activityService.acceptActivity(id)
  }

  @UseGuards(JwtGuard)
  @Post('accommodation/accept/:id')
  acceptAccommodation(
  @Param('id') id: string,
  ) {
    return this.activityService.acceptAccommodation(id)
  }

  @UseGuards(JwtGuard)
  @Delete('restore/:id')
  restoreActivity(
  @Param('id') id: string,
  ) {
    return this.activityService.restoreActivity(id)
  }

  @UseGuards(JwtGuard)
  @Delete('accommodation/restore/:id')
  restoreAccommodation(
  @Param('id') id: string,
  ) {
    return this.activityService.restoreAccommodation(id)
  }
}
