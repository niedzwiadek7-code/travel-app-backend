import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { TravelService } from './travel.service'
import {
  TravelDto,
  PlanATravelDto,
  AddActivityToTravelInstanceDto,
  PassElementDto,
} from './dto'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
  ) {}

  @Get('find/:id')
  get(@Param('id') id: string) {
    return this.travelService.getTravel(parseInt(id, 10))
  }

  @Get('find/instance/:id')
  getInstance(@Param('id') id: string) {
    return this.travelService.getTravelInstance(parseInt(id, 10))
  }

  @Get('user-list')
  getUserTravels(
  @GetUser('id') userId: string,
  ) {
    return this.travelService.getUserTravels(userId)
  }

  @Post('plan-a-travel')
  planATravel(
  @GetUser('id') userId: number,
    @Body() body: PlanATravelDto,
  ) {
    return this.travelService.planATravel(body, userId)
  }

  @Post()
  createElement(
  @Body() body: TravelDto,
    @GetUser('id') userId: string,
  ) {
    return this.travelService.putTravel(body, userId)
  }

  @Put(':id')
  updateElement(
  @GetUser('id') userId: string,
    @Body() body: TravelDto,
    @Param('id') id: string,
  ) {
    return this.travelService.putTravel(body, userId, parseInt(id, 10))
  }

  @Post('travel-instance/element/cancel/:id')
  cancelTravelElementInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.cancelTravelElementInstance(id)
  }

  @Get('instance/all')
  getAllInstance(
  @GetUser('id') userId: number,
  ) {
    return this.travelService.getAllInstances(userId)
  }

  @Delete('/instance/delete/:id')
  deleteInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.deleteTravelInstance(id)
  }

  @Post('travel-instance/activity/add/:travelId')
  addActivityToTravelInstance(
  @Param('travelId') travelId: string,
    @Body() body: AddActivityToTravelInstanceDto,
  ) {
    return this.travelService.addActivityToTravelInstance(travelId, body)
  }

  @UseGuards(JwtGuard)
  @Delete('restore/:id')
  restoreTravelRecipe(
  @Param('id') id: string,
  ) {
    console.log('heree')
    return this.travelService.restoreTravelRecipe(id)
  }
}
