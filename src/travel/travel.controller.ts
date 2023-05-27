import {Controller, Get, Param, Query} from '@nestjs/common'
import { TravelService } from './travel.service'

@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
  ) {}

  @Get(':id')
  get(@Param('id') id: string, @Query('sort') sort: string) {
    switch (sort) {
      case 'byDays':
        return this.travelService.getTravelByDays(id)
      default:
        return this.travelService.getTravel(id)
    }
  }
}
