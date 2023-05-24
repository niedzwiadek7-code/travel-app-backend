import { Controller, Get, Param } from '@nestjs/common'
import { TravelService } from './travel.service'

@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
  ) {}

  @Get(':id')
  get(@Param('id') id: string) {
    return this.travelService.getTravel(id)
  }
}
