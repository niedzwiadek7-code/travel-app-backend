import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import { Travel as TravelEntity } from '../typeorm'

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelEntity)
    private readonly travelRepository: Repository<TravelEntity>,
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
        from: dayjs(e.from).format('HH:mm'),
        to: dayjs(e.to).format('HH:mm'),
        activity: {
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
}
