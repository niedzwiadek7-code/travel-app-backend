import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  TravelRecipe as TravelEntity,
  ElementTravel as ElementTravelEntity,
  AccommodationElementTravel as AccommodationElementTravelEntity,
} from '../typeorm'
import { TravelDto } from './dto/travel.dto'

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelEntity)
    private readonly travelRepository: Repository<TravelEntity>,
    @InjectRepository(ElementTravelEntity)
    private readonly elementTravelRepository: Repository<ElementTravelEntity>,
    @InjectRepository(AccommodationElementTravelEntity)
    private readonly accommodationElementTravelEntity: Repository<AccommodationElementTravelEntity>,
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

  getTravelElement(id: string) {
    const query = this.elementTravelRepository
      .createQueryBuilder('travelElement')
      .innerJoinAndSelect('travelElement.activity', 'activity')
      .leftJoinAndSelect('travelElement.photos', 'elementTravelPhoto')
      .leftJoinAndSelect('activity.questions', 'question')
      .leftJoinAndSelect('question.author', 'questionAuthor')
      .leftJoinAndSelect('question.answers', 'answer')
      .leftJoinAndSelect('answer.author', 'answerAuthor')
      .where('travelElement.id = :id', { id })

    return query.getOne()
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
}
