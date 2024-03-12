import {
  BadRequestException, HttpStatus, Injectable, Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import {
  TravelRecipeEntity,
  ElementTravelEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity,
  PhotoEntity,
  ElementTravelLocallyEntity,
  ElementTravelGloballyEntity,
} from '../resources'
import {
  AddActivityToTravelInstanceDto,
  DateDto,
  PassElementDto,
  PlanATravelDto,
  TravelDto,
} from './dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { DateHandler } from '../utils'
import { ActivityService } from '../activity/activity.service'
import {
  TravelElementGloballyFormat,
  TravelElementLocallyFormat,
  TravelFormat,
  TravelInstanceFormat,
} from './types'

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelRecipeEntity)
    private readonly travelRepository: Repository<TravelRecipeEntity>,
    @InjectRepository(ElementTravelEntity)
    private readonly elementTravelRepository: Repository<ElementTravelEntity>,
    @InjectRepository(TravelInstanceEntity)
    private readonly travelInstanceRepository: Repository<TravelInstanceEntity>,
    @InjectRepository(ElementTravelInstanceEntity)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstanceEntity>,
    @InjectRepository(ElementTravelLocallyEntity)
    private readonly elementTravelLocallyRepository: Repository<ElementTravelLocallyEntity>,
    @InjectRepository(ElementTravelGloballyEntity)
    private readonly elementTravelGloballyRepository: Repository<ElementTravelGloballyEntity>,
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    private dataSource: DataSource,
    private cloudinary: CloudinaryService,
    private logger: Logger,
    private activityService: ActivityService,
  ) {}

  transformTravelElementLocally(travelElement: ElementTravelEntity): TravelElementLocallyFormat {
    return {
      id: travelElement.id,
      activity: this.activityService.transformActivity(travelElement.activity),
      numberOfPeople: travelElement.numberOfPeople,
      price: travelElement.price,
      description: travelElement.description,
      dayCount: travelElement.elementTravelLocally.dayCount,
      from: travelElement.elementTravelLocally.from,
      to: travelElement.elementTravelLocally.to,
    }
  }

  transformTravelElementGlobally(travelElement: ElementTravelEntity): TravelElementGloballyFormat {
    return {
      id: travelElement.id,
      activity: this.activityService.transformActivity(travelElement.activity),
      numberOfPeople: travelElement.numberOfPeople,
      price: travelElement.price,
      description: travelElement.description,
      from: travelElement.elementTravelGlobally.from,
      to: travelElement.elementTravelGlobally.to,
    }
  }

  transformTravelRecipe(travelRecipe: TravelRecipeEntity): TravelFormat {
    const travelElementsLocally: TravelElementLocallyFormat[] = travelRecipe.travelElements
      .filter((elem) => elem.elementTravelLocally)
      .sort((elemA, elemB) => {
        const localObjA = elemA.elementTravelLocally
        const localObjB = elemB.elementTravelLocally

        if (localObjA.dayCount !== localObjB.dayCount) {
          return localObjA.dayCount - localObjB.dayCount
        }
        return DateHandler.compareDates(localObjA.from, localObjB.from)
      })
      .map(this.transformTravelElementLocally)

    const travelElementsGlobally: TravelElementGloballyFormat[] = travelRecipe.travelElements
      .filter((elem) => elem.elementTravelGlobally)
      .sort((elemA, elemB) => {
        const globalObjA = elemA.elementTravelGlobally
        const globalObjB = elemB.elementTravelGlobally

        return globalObjA.from - globalObjB.from
      })
      .map(this.transformTravelElementGlobally)

    return {
      id: travelRecipe.id,
      name: travelRecipe.name,
      countDays: travelRecipe.countDays,
      travelElementsLocally,
      travelElementsGlobally,
    }
  }

  transformTravelInstance(travelInstance: TravelInstanceEntity): TravelInstanceFormat {
    return {
      id: travelInstance.id,
      from: new DateHandler(travelInstance.from).toISOString(),
      to: new DateHandler(travelInstance.to).toISOString(),
      travelElements: travelInstance.travelElements.map((elemInstance) => {
        const getTravelElement = (elemTravel):
        TravelElementLocallyFormat | TravelElementGloballyFormat | undefined => {
          if (!elemTravel) {
            return undefined
          }
          if (elemTravel.elementTravelLocally) {
            return this.transformTravelElementLocally(elemTravel)
          }
          return this.transformTravelElementGlobally(elemTravel)
        }

        return {
          id: elemInstance.id,
          passed: elemInstance.passed,
          from: new DateHandler(elemInstance.from).toISOString(),
          to: new DateHandler(elemInstance.to).toISOString(),
          activity: this.activityService.transformActivity(elemInstance.activity),
          photos: elemInstance.photos,
          elementTravel: getTravelElement(elemInstance.elementTravel),
        }
      }),
      travelRecipe: {
        id: travelInstance.travelRecipe.id,
        name: travelInstance.travelRecipe.name,
        countDays: travelInstance.travelRecipe.countDays,
      },
    }
  }

  async getTravel(id: number): Promise<TravelFormat> {
    const result = await this.travelRepository.findOne({
      where: {
        id,
      },
      relations: [
        'travelElements',
        'travelElements.elementTravelLocally',
        'travelElements.elementTravelGlobally',
        'travelElements.activity',
        'travelElements.activity.accommodation',
        'travelElements.activity.attraction',
        'travelElements.activity.restaurant',
        'travelElements.activity.trip',
      ],
      withDeleted: true,
    })

    return this.transformTravelRecipe(result)
  }

  async getUserTravels(userId: string) {
    const results = await this.travelRepository.find({
      where: {
        userId,
      },
      relations: [
        'travelElements',
        'travelElements.activity',
        'travelElements.activity.activityType',
        'accommodationTravelElements',
        'accommodationTravelElements.accommodation',
      ],
      withDeleted: true,
    })

    return results.map((result) => this.transformTravelRecipe(result))
  }

  async putTravel(body: TravelDto, userId: string, travelId?: number): Promise<TravelFormat> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    let travelRecipe: TravelRecipeEntity

    try {
      await queryRunner.startTransaction()
      const transformDate = (date: DateDto) => `${date.hour}:${date.minute}`

      if (travelId) {
        await this.elementTravelRepository.delete({
          travelId,
        })
      }

      const travelRecipeObj = this.travelRepository.create({
        id: travelId,
        name: body.name,
        countDays: body.countDays,
        userId,
        travelElements: body.travelElements
          .map((travelElement) => this.elementTravelRepository.create({
            price: travelElement.price,
            numberOfPeople: travelElement.numberOfPeople,
            description: travelElement.description,
            activityId: travelElement.activityId,
            elementTravelGlobally:
              travelElement.travelElementGlobally
              && this.elementTravelGloballyRepository.create({
                from: travelElement.travelElementGlobally.from,
                to: travelElement.travelElementGlobally.to,
              }),
            elementTravelLocally:
              travelElement.travelElementLocally
              && this.elementTravelLocallyRepository.create({
                dayCount: travelElement.travelElementLocally.dayCount,
                from: transformDate(travelElement.travelElementLocally.from),
                to: transformDate(travelElement.travelElementLocally.to),
              }),
          })),
      })
      travelRecipe = await this.travelRepository.save(travelRecipeObj)
    } catch (err) {
      this.logger.error(err)
      await queryRunner.rollbackTransaction()
      throw new BadRequestException()
    } finally {
      await queryRunner.release()
    }

    return this.transformTravelRecipe(travelRecipe)
  }

  async planATravel(body: PlanATravelDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    let travelInstanceResult: TravelInstanceEntity

    try {
      await queryRunner.startTransaction()
      const travelRecipe = await this.getTravel(body.travelRecipeId)

      const travelElements = await this.elementTravelRepository.find({
        where: {
          travelId: body.travelRecipeId,
        },
      })

      travelInstanceResult = this.travelInstanceRepository.create({
        userId,
        travelRecipeId: body.travelRecipeId,
        from:
          new DateHandler(body.startDate)
            .toISOString(),
        to:
          new DateHandler(body.startDate)
            .add(travelRecipe.countDays - 1, 'days')
            .toISOString(),
        travelElements: travelElements.map((elem) => {
          const travelElement = this.elementTravelInstanceRepository.create({
            activityId: elem.activityId,
            elementTravelId: elem.id,
          })

          if (elem.elementTravelLocally) {
            travelElement.from = new DateHandler(`${body.startDate} ${elem.elementTravelLocally.from}`)
              .add(elem.elementTravelLocally.dayCount - 1, 'days')
              .toISOString()

            travelElement.to = new DateHandler(`${body.startDate} ${elem.elementTravelLocally.from}`)
              .add(elem.elementTravelLocally.dayCount - 1, 'days')
              .toISOString()
          }

          if (elem.elementTravelGlobally) {
            travelElement.from = new DateHandler(body.startDate)
              .add(elem.elementTravelGlobally.from - 1, 'days')
              .toISOString()

            travelElement.to = new DateHandler(body.startDate)
              .add(elem.elementTravelGlobally.to - 1, 'days')
              .toISOString()
          }

          return travelElement
        }),
      })
    } catch (err) {
      this.logger.error(err)
      await queryRunner.rollbackTransaction()
      throw new BadRequestException()
    } finally {
      await queryRunner.release()
    }

    return this.transformTravelInstance(travelInstanceResult)
  }

  async getTravelInstance(id: string) {
    const travelInstance = await this.travelInstanceRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      relations: [
        'travelElements',
        'travelElements.activity',
        'travelElements.activity.accommodation',
        'travelElements.activity.trip',
        'travelElements.activity.restaurant',
        'travelElements.activity.attraction',
        'travelElements.elementTravel',
        'travelElements.elementTravel.elementTravelGlobally',
        'travelElements.elementTravel.elementTravelLocally',
        'travelElements.photos',
        'travelRecipe',
      ],
      withDeleted: true,
    })

    return this.transformTravelInstance(travelInstance)
  }

  async passTravelElement(id: string, files: Express.Multer.File[]): Promise<PassElementDto> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    const urls = []

    try {
      await queryRunner.startTransaction()
      await this.elementTravelInstanceRepository.save({
        id: parseInt(id, 10),
        passed: true,
      })

      const addPhotos = async () => Promise.all(files.map(async (file) => {
        try {
          const photoObj = await this.cloudinary.uploadImage(file)
          await this.photoRepository.save({
            elementTravelId: id,
            url: photoObj.url,
          })
          urls.push(photoObj.url)
        } catch (err) {
          this.logger.error(err)
        }
      }))

      await addPhotos()
    } catch (err) {
      this.logger.error(err)
      await queryRunner.rollbackTransaction()
      throw new BadRequestException()
    } finally {
      await queryRunner.release()
    }

    return {
      urls,
    }
  }

  async getAllInstances(userId: number) {
    const travelInstances = await this.travelInstanceRepository.find({
      where: {
        userId,
      },
      relations: [
        'travelElements',
        'travelElements.activity',
        'travelElements.activity.accommodation',
        'travelElements.activity.trip',
        'travelElements.activity.restaurant',
        'travelElements.activity.attraction',
        'travelElements.elementTravel',
        'travelElements.elementTravel.elementTravelGlobally',
        'travelElements.elementTravel.elementTravelLocally',
        'travelElements.photos',
        'travelRecipe',
      ],
      withDeleted: true,
    })

    return travelInstances.map(this.transformTravelInstance)
  }

  async cancelTravelElementInstance(id: string) {
    await this.elementTravelInstanceRepository.delete({ id: parseInt(id, 10) })
    return HttpStatus.OK
  }

  async deleteTravelInstance(id: string) {
    await this.travelInstanceRepository.delete({ id: parseInt(id, 10) })
    return HttpStatus.OK
  }

  async addActivityToTravelInstance(travelId: string, body: AddActivityToTravelInstanceDto) {
    const elementTravelInstance = this.elementTravelInstanceRepository.create({
      travelInstanceId: travelId,
      activityId: body.activityId,
      from: new DateHandler(body.from).toISOString(),
      to: new DateHandler(body.to).toISOString(),
    })
    return this.elementTravelInstanceRepository.save(elementTravelInstance)
  }
}
