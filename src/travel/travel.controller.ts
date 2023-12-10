import {
  Body, Controller, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { TravelService } from './travel.service'
import { TravelDto, PlanATravelDto } from './dto'
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
  getUserTravels() {
    return this.travelService.getUserTravels('1')
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
  @UseInterceptors(FilesInterceptor('images', 100, multerConfigOptions))
  passTravelElement(
  @Param('id') id: string,
    @UploadedFiles() files: MulterFile[],
  ) {
    return this.travelService.passTravelElement(id, files)
  }

  @Post('travel-instance/element/cancel/:id')
  cancelTravelElementInstance(
  @Param('id') id: string,
  ) {
    return this.travelService.cancelTravelElementInstance(id)
  }
}
