import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import { Travel as TravelEntity, ElementTravel as ElementTravelEntity } from '../typeorm'

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelEntity)
    private readonly travelRepository: Repository<TravelEntity>,
    @InjectRepository(ElementTravelEntity)
    private readonly elementTravelRepository: Repository<ElementTravelEntity>,
  ) {}

  async getTravel(id: string) {
    const query = this.travelRepository
      .createQueryBuilder('travel')
      .innerJoinAndSelect('travel.user', 'user')
      .innerJoinAndSelect('travel.place', 'place')
      .innerJoinAndSelect('travel.travelElements', 'travelElement')
      .innerJoinAndSelect('travelElement.activity', 'activity')
      .innerJoinAndSelect('travelElement.photos', 'elementTravelPhoto')
      .where('travel.id = :id', { id })

    const travel = query.getOne()

    if (!travel) {
      throw new NotFoundException()
    }

    return travel
  }

  async getTravelByDays(id: string) {
    const query = this.travelRepository
      .createQueryBuilder('travel')
      .innerJoinAndSelect('travel.place', 'place')
      .innerJoinAndSelect('travel.travelElements', 'travelElement')
      .innerJoinAndSelect('travelElement.activity', 'activity')
      .innerJoinAndSelect('travelElement.photos', 'elementTravelPhoto')
      .where('travel.id = :id', { id })

    const result = await query.getOne()

    const travelElements = {}

    result.travelElements.forEach((e) => {
      const day = dayjs(e.from).format('DD.MM.YYYY')

      if (!travelElements[day]) {
        travelElements[day] = []
      }

      const travelElement = {
        id: e.id,
        from: dayjs(e.from).format('HH:mm'),
        to: dayjs(e.to).format('HH:mm'),
        activity: {
          id: e.activity.id,
          name: e.activity.name,
          price: e.activity.price,
        },
        photos: e.photos.map((photo) => photo.url),
      }

      travelElements[day].push(travelElement)
    })

    return {
      id: result.id,
      name: result.name,
      place: result.place,
      travelElements,
    }
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
}
