import { Controller, Get, Param } from '@nestjs/common'
import { PlaceService } from './place.service'

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.placeService.getPlace(id)
  }
}
