import {
  Body,
  Controller, Get, Param, Post, Put, Query, UseGuards,
} from '@nestjs/common'
import { TravelService } from './travel.service'
import { TravelDto } from './dto/travel.dto'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
  ) {}

  @Get(':id')
  get(@Param('id') id: string) {
    return this.travelService.getTravel(id)
  }

  @Get('element/:id')
  getElement(@Param('id') id: string) {
    return this.travelService.getTravelElement(id)
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
