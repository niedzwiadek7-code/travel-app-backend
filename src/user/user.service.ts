import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Travel as TravelEntity } from '../typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TravelEntity)
    private readonly travelService: Repository<TravelEntity>,
  ) {}

  async getTravels(id: number) {
    const query = this.travelService
      .createQueryBuilder('travel')
      .innerJoinAndSelect('travel.place', 'place')
      .innerJoinAndSelect('travel.travelElements', 'travelElement')
      .innerJoinAndSelect('travelElement.activity', 'activity')
      .innerJoinAndSelect('travelElement.photos', 'elementTravelPhoto')
      .where('userId = :id', { id })

    return query.getMany()
  }
}
