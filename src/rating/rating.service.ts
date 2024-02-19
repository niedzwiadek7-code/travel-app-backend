import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PutActivityDto } from './dto'
import {
  AccommodationElementTravelInstanceEntity, AccommodationRatingEntity, ElementTravelInstanceEntity, RatingEntity,
} from '../resources'

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(ElementTravelInstanceEntity)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstanceEntity>,
    @InjectRepository(AccommodationRatingEntity)
    private readonly accommodationRatingRepository: Repository<AccommodationRatingEntity>,
    @InjectRepository(AccommodationElementTravelInstanceEntity)
    private readonly accommodationElementTravelInstanceRepository: Repository<AccommodationElementTravelInstanceEntity>,
  ) {}

  async putActivityRating(body: PutActivityDto, userId: string) {
    const elementTravelInstance = await this.elementTravelInstanceRepository.findOne({
      where: {
        id: parseInt(body.elementTravelId, 10),
      },
    })

    const rating = this.ratingRepository.create({
      text: body.text,
      authorId: userId,
      activityId: elementTravelInstance.activityId,
      elementTravelId: body.elementTravelId,
      sharePhotos: body.sharePhotos,
    })

    const actualRatingObj = await this.ratingRepository.findOne({
      where: {
        elementTravelId: body.elementTravelId,
      },
    })

    if (actualRatingObj) {
      rating.id = actualRatingObj.id
    }

    return this.ratingRepository.save(rating)
  }

  async putAccommodationRating(body: PutActivityDto, userId: string) {
    const elementTravelInstance = await this.accommodationElementTravelInstanceRepository.findOne({
      where: {
        id: parseInt(body.elementTravelId, 10),
      },
    })

    const rating = this.accommodationRatingRepository.create({
      text: body.text,
      authorId: userId,
      accommodationId: elementTravelInstance.accommodationId,
      elementTravelId: body.elementTravelId,
      sharePhotos: body.sharePhotos,
    })

    const actualRatingObj = await this.accommodationRatingRepository.findOne({
      where: {
        elementTravelId: body.elementTravelId,
      },
    })

    if (actualRatingObj) {
      rating.id = actualRatingObj.id
    }

    return this.accommodationRatingRepository.save(rating)
  }

  async getRating(id: string) {
    const result = await this.ratingRepository.findOne({
      where: {
        elementTravelId: id,
      },
    })

    if (!result) {
      return null
    }

    return {
      text: result.text,
      sharePhotos: result.sharePhotos,
    }
  }

  async getAccommodationRating(id: string) {
    const result = await this.accommodationRatingRepository.findOne({
      where: {
        elementTravelId: id,
      },
    })

    if (!result) {
      return null
    }

    return {
      text: result.text,
      sharePhotos: result.sharePhotos,
    }
  }
}
