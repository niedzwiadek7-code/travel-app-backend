import {
  Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
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
  @UseInterceptors(FilesInterceptor('photosToAdd', 100))
  putRating(
  @Body() body: PutActivityDto,
    @GetUser('id') userId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.ratingService.putActivityRating(
      body,
      userId,
      files,
    )
  }

  @Get('find/:elementTravelId')
  get(
  @Param('elementTravelId') elementTravelId: number,
  ) {
    return this.ratingService.getRating(elementTravelId)
  }
}
