import {
  Controller, Delete, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common'
import { ActivityService } from './activity.service'
import { QueryActivityDto } from './dto'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { ActivityType } from './types'

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('all')
  getAll(
  @Query('source') source: QueryActivityDto,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @GetUser('id') userId: string,
    @Query('types') types?: ActivityType[],
  ) {
    return this.activityService.getAllActivities(
      source,
      userId,
      {
        take,
        skip,
      },
      types,
    )
  }

  @Get('find/:id')
  get(@Param('id') id: string) {
    return this.activityService.getActivity(id)
  }

  @UseGuards(JwtGuard)
  @Post('accept/:id')
  acceptActivity(
  @Param('id') id: string,
  ) {
    return this.activityService.acceptActivity(id)
  }

  @UseGuards(JwtGuard)
  @Delete('restore/:id')
  restoreActivity(
  @Param('id') id: string,
  ) {
    return this.activityService.restoreActivity(id)
  }
}
