import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PutActivityDto } from './dto'
import {
  AccommodationElementTravelInstance, AccommodationRating, ElementTravelInstance, Rating,
} from '../typeorm'

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(ElementTravelInstance)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstance>,
    @InjectRepository(AccommodationRating)
    private readonly accommodationRatingRepository: Repository<AccommodationRating>,
    @InjectRepository(AccommodationElementTravelInstance)
    private readonly accommodationElementTravelInstanceRepository: Repository<AccommodationElementTravelInstance>,
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
