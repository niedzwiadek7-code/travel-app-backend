import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
      .where('travel.id = :id', { id })

    const travel = query.getOne()

    if (!travel) {
      throw new NotFoundException()
    }

    return travel
  }
}
