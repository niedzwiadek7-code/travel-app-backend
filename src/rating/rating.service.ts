import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { PutActivityDto } from './dto'
import {
  ElementTravelInstanceEntity,
  RatingEntity,
} from '../resources'
import { RatingFormat } from './types'

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(ElementTravelInstanceEntity)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstanceEntity>,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
  ) {}

  transformRating(result: RatingEntity): RatingFormat {
    return {
      id: result.id,
      text: result.text,
      sharePhotos: result.sharePhotos,
    }
  }

  async putActivityRating(body: PutActivityDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    let rating: RatingEntity

    try {
      await queryRunner.startTransaction()
      const elementTravelInstance = await this.elementTravelInstanceRepository.findOne({
        where: {
          id: body.elementTravelId,
        },
      })

      const ratingObj: RatingEntity = this.ratingRepository.create({
        text: body.text,
        authorId: userId,
        activityId: elementTravelInstance.activityId,
        elementTravelId: body.elementTravelId,
        sharePhotos: body.sharePhotos,
      })
      rating = await this.ratingRepository.save(ratingObj)

      await queryRunner.commitTransaction()
    } catch (err) {
      this.logger.error(err)
      await queryRunner.rollbackTransaction()
      throw new BadRequestException(err.message)
    }

    return this.transformRating(rating)
  }

  async getRating(id: number): Promise<RatingFormat> {
    const result = await this.ratingRepository.findOne({
      where: {
        elementTravelId: id,
      },
    })

    if (!result) {
      return null
    }

    return this.transformRating(result)
  }
}
