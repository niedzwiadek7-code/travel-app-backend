import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import {
  TravelRecipe as TravelEntity,
  ElementTravel as ElementTravelEntity,
  AccommodationElementTravel as AccommodationElementTravelEntity,
  TravelInstance, ElementTravelInstance,
} from '../typeorm'
import { PlanATravelDto, TravelDto } from './dto'
import { ElementTravelPhoto } from '../typeorm/ElementTravelPhoto'

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelEntity)
    private readonly travelRepository: Repository<TravelEntity>,
    @InjectRepository(ElementTravelEntity)
    private readonly elementTravelRepository: Repository<ElementTravelEntity>,
    @InjectRepository(AccommodationElementTravelEntity)
    private readonly accommodationElementTravelEntity: Repository<AccommodationElementTravelEntity>,
    @InjectRepository(TravelInstance)
    private readonly travelInstanceRepository: Repository<TravelInstance>,
    @InjectRepository(ElementTravelInstance)
    private readonly elementTravelInstanceRepository: Repository<ElementTravelInstance>,
    @InjectRepository(ElementTravelPhoto)
    private readonly elementTravelPhotoRepository: Repository<ElementTravelPhoto>,
  ) {}

  async getTravel(id: string) {
    const result = await this.travelRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      relations: [
        'travelElements',
        'travelElements.activity',
        'travelElements.activity.activityType',
        'travelElements.activity.activityParameters',
        'travelElements.activity.activityParameters.activityTypeParameter',
        'accommodationTravelElements',
        'accommodationTravelElements.accommodation',
      ],
    })

    const transformedObj: Record<string, any> = {
      id: result.id,
      name: result.name,
      countDays: result.countDays,
    }

    transformedObj.travelElements = result.travelElements.sort((elemA, elemB) => {
      if (elemA.dayCount > elemB.dayCount) {
        return 1
      }
      if (elemA.dayCount < elemB.dayCount) {
        return -1
      }
      if (elemA.from > elemB.from) {
        return 1
      }
      return -1
    }).map((elem) => {
      const getActivity = () => {
        const params = {}

        elem.activity.activityParameters.forEach((param) => {
          params[param.activityTypeParameter.name] = param.value
        })

        return {
          id: elem.activity.id,
          name: elem.activity.name,
          description: elem.activity.description,
          activityType: elem.activity.activityType.name,
          ...params,
        }
      }

      return {
        id: elem.id,
        dayCount: elem.dayCount,
        from: elem.from,
        to: elem.to,
        price: elem.price,
        numberOfPeople: elem.numberOfPeople,
        description: elem.description,
        activity: getActivity(),
      }
    })

    transformedObj.accommodations = result.accommodationTravelElements.map((accommodation) => ({
      id: accommodation.id,
      numberOfDays: accommodation.numberOfDays,
      price: accommodation.price,
      description: accommodation.description,
      accommodation: {
        id: accommodation.accommodation.id,
        name: accommodation.accommodation.name,
        description: accommodation.accommodation.description,
        accommodation: accommodation.accommodation.place,
      },
    }))

    return transformedObj
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
    })

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      countDays: result.countDays,
      elements: result.travelElements.map((elem) => ({
        price: elem.price,
        activityType: elem.activity.activityType.name,
        name: elem.activity.name,
      })),
      accommodations: result.accommodationTravelElements.map((elem) => ({
        price: elem.price,
        name: elem.accommodation.name,
      })),
    }))
  }

  async createTravel(body: TravelDto, userId: string) {
    const travelRecipe = this.travelRepository.create({
      name: body.name,
      countDays: body.countDays,
      userId,
    })
    const result = await this.travelRepository.save(travelRecipe)

    const travelElements = this.elementTravelRepository.create(
      body.travelElements.map((travelElement) => ({
        dayCount: travelElement.dayCount,
        from: `${travelElement.from.hour}:${travelElement.from.minute}`,
        to: `${travelElement.to.hour}:${travelElement.to.minute}`,
        price: travelElement.price,
        numberOfPeople: travelElement.numberOfPeople,
        description: travelElement.description,
        activityId: travelElement.activityId.toString(),
        travelId: result.id.toString(),
      })),
    )
    await this.elementTravelRepository.save(travelElements)

    const accommodationsElements = this.accommodationElementTravelEntity.create(
      body.accommodations.map((accommodation) => ({
        numberOfDays: accommodation.numberOfDays,
        accommodationId: accommodation.accommodationId.toString(),
        travelId: result.id.toString(),
        price: accommodation.price,
        description: accommodation.description,
      })),
    )
    await this.accommodationElementTravelEntity.save(accommodationsElements)

    return result
  }

  async updateTravel(body: TravelDto, id: string) {
    const travelRecipe = this.travelRepository.create({
      id: parseInt(id, 10),
      name: body.name,
      countDays: body.countDays,
    })
    const result = await this.travelRepository.save(travelRecipe)

    await this.elementTravelRepository.delete({ travelId: id })

    const travelElements = this.elementTravelRepository.create(
      body.travelElements.map((travelElement) => ({
        dayCount: travelElement.dayCount,
        from: `${travelElement.from.hour}:${travelElement.from.minute}`,
        to: `${travelElement.to.hour}:${travelElement.to.minute}`,
        price: travelElement.price,
        numberOfPeople: travelElement.numberOfPeople,
        description: travelElement.description,
        activityId: travelElement.activityId.toString(),
        travelId: id,
      })),
    )
    await this.elementTravelRepository.save(travelElements)

    await this.accommodationElementTravelEntity.delete({ travelId: id })

    const accommodationsElements = this.accommodationElementTravelEntity.create(
      body.accommodations.map((accommodation) => ({
        numberOfDays: accommodation.numberOfDays,
        accommodationId: accommodation.accommodationId.toString(),
        travelId: result.id.toString(),
        price: accommodation.price,
        description: accommodation.description,
      })),
    )
    await this.accommodationElementTravelEntity.save(accommodationsElements)

    return result
  }

  async planATravel(body: PlanATravelDto, userId: string) {
    const travelRecipe = await this.travelRepository.findOne({
      where: {
        id: parseInt(body.travelRecipeId, 10),
      },
      relations: ['travelElements', 'travelElements.activity'],
    })

    const travelInstance = this.travelInstanceRepository.create({
      userId,
      travelRecipeId: body.travelRecipeId,
      from: dayjs(body.startDate).toISOString(),
      to: dayjs(body.startDate).add(travelRecipe.countDays - 1, 'days').toISOString(),
    })
    const travelInstanceResult = await this.travelInstanceRepository.save(travelInstance)

    for (const travelElement of travelRecipe.travelElements) {
      const getTime = (timeStr) => {
        const timeElements = timeStr.split(':')
        return dayjs()
          .set('hours', timeElements[0])
          .set('minute', timeElements[1])
      }

      const from = getTime(travelElement.from)
      const to = getTime(travelElement.to)

      const elementTravelInstance = this.elementTravelInstanceRepository.create({
        from: dayjs(body.startDate)
          .add(travelElement.dayCount - 1, 'days')
          .set('hour', from.get('hours'))
          .set('minute', from.get('minutes'))
          .toISOString(),
        to: dayjs(body.startDate)
          .add(travelElement.dayCount - 1, 'days')
          .set('hour', to.get('hours'))
          .set('minute', to.get('minutes'))
          .toISOString(),
        travelInstanceId: travelInstanceResult.id.toString(),
        activityId: travelElement.activity.id.toString(),
      })
      await this.elementTravelInstanceRepository.save(elementTravelInstance)
    }

    return travelInstanceResult
  }
}
