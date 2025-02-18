import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { PutActivityDto } from './dto'
import {
  ElementTravelInstanceEntity, PhotoEntity,
  RatingEntity,
} from '../resources'
import { RatingFormat } from './types'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(ElementTravelInstanceEntity)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstanceEntity>,
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
    private cloudinary: CloudinaryService,
  ) {}

  transformRating(result: RatingEntity): RatingFormat {
    return {
      elementTravelId: result.elementTravelId,
      text: result.text,
      rating: result.rating,
      photos: (result?.elementTravel?.photos || []).map((photo) => ({
        url: photo.url,
        id: photo.id,
        isShared: photo.isShared,
      })),
    }
  }

  async putActivityRating(
    body: PutActivityDto,
    userId: number,
    photosToAdd: Express.Multer.File[],
  ): Promise<RatingFormat> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    let rating: RatingEntity

    try {
      await queryRunner.startTransaction()
      const elementTravelInstance = await this.elementTravelInstanceRepository.findOne({
        where: {
          id: parseInt(body.elementTravelId, 10),
        },
      })

      const deletePhotos = async () => {
        if (body.photosToDelete) {
          await Promise.all(body.photosToDelete.map(async (photoId) => {
            await this.photoRepository.softDelete(photoId)
          }))
        }
      }

      const addPhotos = async () => {
        if (photosToAdd) {
          await Promise.all(photosToAdd.map(async (photo) => {
            const photoObj = await this.cloudinary.uploadImage(photo)
            await this.photoRepository.save({
              elementTravelInstanceId: parseInt(body.elementTravelId, 10),
              url: photoObj.url,
              isShared: true,
            })
          }))
        }
      }

      const createRating = async () => {
        const ratingObj: RatingEntity = this.ratingRepository.create({
          text: body.text,
          rating: parseInt(body.rating, 10),
          authorId: userId,
          activityId: elementTravelInstance.activityId,
          elementTravelId: parseInt(body.elementTravelId, 10),
        })
        rating = await this.ratingRepository.save(ratingObj)

        await this.elementTravelInstanceRepository.save({
          id: parseInt(body.elementTravelId, 10),
          passed: true,
        })
      }

      await deletePhotos()
      await addPhotos()
      await createRating()

      await queryRunner.commitTransaction()
    } catch (err) {
      this.logger.error(err)
      await queryRunner.rollbackTransaction()
      throw new BadRequestException(err.message)
    }

    return this.getRating(rating.elementTravelId)
  }

  async getRating(id: number): Promise<RatingFormat> {
    const result = await this.ratingRepository.findOne({
      where: {
        elementTravelId: id,
      },
      relations: ['elementTravel', 'elementTravel.photos'],
    })

    if (!result) {
      return null
    }

    return this.transformRating(result)
  }
}
