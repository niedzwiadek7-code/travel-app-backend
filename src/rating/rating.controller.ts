import {
  Body, Controller, Post, UseGuards,
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
    @GetUser('id') userId: string,
  ) {
    switch (body.activityType) {
      case 'Nocleg':
      case 'accommodation':
        return this.ratingService.putAccommodationRating(body, userId)
      default:
        return this.ratingService.putActivityRating(body, userId)
    }
  }
}
