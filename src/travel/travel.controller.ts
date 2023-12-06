import {
  Body,
  Controller, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common'
import { TravelService } from './travel.service'
import { TravelDto, PlanATravelDto } from './dto'
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
    return this.travelService.getTravel(id)
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
}
