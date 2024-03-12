import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { PutActivityDto } from './dto'
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'

@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  putRating(
  @Body() body: PutActivityDto,
    @GetUser('id') userId: number,
  ) {
    return this.ratingService.putActivityRating(body, userId)
  }

  @Get('find/:elementTravelId')
  get(
  @Param('elementTravelId') elementTravelId: number,
  ) {
    return this.ratingService.getRating(elementTravelId)
  }
}
