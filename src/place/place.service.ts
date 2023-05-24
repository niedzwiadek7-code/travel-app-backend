import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Place as PlaceEntity } from '../typeorm'

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
  ) {}

  async getPlace(id: string) {
    const place = this.placeRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
    })

    if (!place) {
      throw new NotFoundException()
    }

    return place
  }
}
