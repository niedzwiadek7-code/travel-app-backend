import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { TravelService } from './travel.service'
import {
  TravelDto, PlanATravelDto, AddActivityToTravelInstanceDto, AddAccommodationToTravelInstanceDto, PassElementDto,
} from './dto'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { multerConfigOptions } from '../config/multerConfigOptions'
import { MulterFile } from '../model'

@UseGuards(JwtGuard)
@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
  ) {}

  @Get('find/:id')
  get(@Param('id') id: string) {
    return this.travelService.getTravel(id)
  }

  @Get('find/instance/:id')
  getInstance(@Param('id') id: string) {
    return this.travelService.getTravelInstance(id)
  }

  @Get('user-list')
  getUserTravels(
  @GetUser('id') userId: string,
  ) {
    return this.travelService.getUserTravels(userId)
  }

  @Post('plan-a-travel')
  planATravel(
  @GetUser('id') userId: string,
    @Body() body: PlanATravelDto,
  ) {
    return this.travelService.planATravel(body, userId)
  }

  @Post()
  createElement(
  @Body() body: TravelDto,
    @GetUser('id') userId: string,
  ) {
    return this.travelService.createTravel(body, userId)
  }

  @Put(':id')
  updateElement(
  @Body() body: TravelDto,
    @Param('id') id: string,
  ) {
    return this.travelService.updateTravel(body, id)
  }

  @Put('pass-travel-element/:id')
  @UseInterceptors(FilesInterceptor('images', 100))
  passTravelElement(
    @Param('id') id: string,
      @UploadedFiles() files: Express.Multer.File[],
  ): Promise<PassElementDto> {
    return this.travelService.passTravelElement(id, files)
  }

  @Post('travel-instance/element/cancel/:id')
  cancelTravelElementInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.cancelTravelElementInstance(id)
  }

  @Get('instance/all')
  getAllInstance(
  @GetUser('id') id: string,
  ) {
    return this.travelService.getAllInstances(id)
  }

  @Delete('/instance/delete/:id')
  deleteInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.deleteTravelInstance(id)
  }

  @Post('travel-instance/accommodation/cancel/:id')
  cancelAccommodationElementInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.cancelAccommodationElementInstance(id)
  }

  @Put('pass-accommodation-element/:id')
  @UseInterceptors(FilesInterceptor('images', 100))
  passAccommodationElement(
    @Param('id') id: string,
      @UploadedFiles() files: Express.Multer.File[],
  ): Promise<PassElementDto> {
    return this.travelService.passAccommodationElement(id, files)
  }

  @Post('travel-instance/activity/add/:travelId')
  addActivityToTravelInstance(
  @Param('travelId') travelId: string,
    @Body() body: AddActivityToTravelInstanceDto,
  ) {
    return this.travelService.addActivityToTravelInstance(travelId, body)
  }

  @Post('travel-instance/accommodation/add/:travelId')
  addAccommodationToTravelInstance(
  @Param('travelId') travelId: string,
    @Body() body: AddAccommodationToTravelInstanceDto,
  ) {
    return this.travelService.addAccommodationToTravelInstance(travelId, body)
  }
}
