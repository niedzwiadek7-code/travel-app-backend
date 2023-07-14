import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TravelRecipe, User } from '../typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TravelRecipe)
    private readonly travelRecipeRepository: Repository<TravelRecipe>,
  ) {}

  async getById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async getTravels(id: number) {
    const query = this.travelRecipeRepository
      .createQueryBuilder('travel')
      .innerJoinAndSelect('travel.place', 'place')
      .innerJoinAndSelect('travel.travelElements', 'travelElement')
      .innerJoinAndSelect('travelElement.activity', 'activity')
      .innerJoinAndSelect('travelElement.photos', 'elementTravelPhoto')
      .where('userId = :id', { id })

    return query.getMany()
  }
}
