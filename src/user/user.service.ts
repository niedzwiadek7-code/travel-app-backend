import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {TravelInstance, TravelRecipe, User } from '../typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TravelRecipe)
    private readonly travelRecipeRepository: Repository<TravelRecipe>,
    @InjectRepository(TravelInstance)
    private readonly travelInstanceRepository: Repository<TravelInstance>,
  ) {}

  async getById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async getTravelsRecipe(id: number) {
    return this.travelRecipeRepository.find({
      where: {
        userId: id,
      },
      relations: ['place'],
    })
  }
}
