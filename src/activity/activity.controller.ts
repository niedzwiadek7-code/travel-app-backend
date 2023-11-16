import {
  Body, Controller, Get, Param, Post,
} from '@nestjs/common'
import { ActivityService } from './activity.service'
import { ActivityDto } from './dto'

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @Get('all')
  getAll() {
    return this.activityService.getAllActivities()
  }

  @Get('accommodation/all')
  getAllAccommodations() {
    return this.activityService.getAllAccommodations()
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

  @Post()
  createActivity(
  @Body() body: ActivityDto,
  ) {
    switch (body.activityType) {
      case 'Nocleg':
      case 'accommodation':
        return this.activityService.createAccommodation(body)
        break
      default:
        return this.activityService.createActivity(body)
    }
  }
}
