import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {
  Accommodation, AccommodationPrice,
  Activity as ActivityEntity,
  ActivityParameter as ActivityParameterEntity,
  ActivityType as ActivityTypeEntity,
  ActivityTypeParameter as ActivityTypeParameterEntity,
  Price as PriceEntity,
} from '../typeorm'
import { ActivityDto, QueryActivity } from './dto'

dayjs.extend(isSameOrAfter)

const getPrice = (result) => {
  if (!result.prices) {
    return null
  }

  const sameOrBeforePriceList = result.prices.filter(
    (price) => dayjs().isSameOrAfter(price.startDate),
  )

  return sameOrBeforePriceList.sort((a, b) => {
    if (dayjs(a.startDate).isSameOrAfter(b.startDate)) {
      return 1
    }
    return -1
  })[0]
}

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    @InjectRepository(ActivityTypeEntity)
    private readonly activityTypeRepository: Repository<ActivityTypeEntity>,
    @InjectRepository(ActivityTypeParameterEntity)
    private readonly activityTypeParameterRepository: Repository<ActivityTypeParameterEntity>,
    @InjectRepository(ActivityParameterEntity)
    private readonly activityParameterRepository: Repository<ActivityParameterEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepository: Repository<PriceEntity>,
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(AccommodationPrice)
    private readonly accommodationPriceRepository: Repository<AccommodationPrice>,
  ) {}

  async getActivity(id: string) {
    const result = await this.activityRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      withDeleted: true,
      relations: ['activityType', 'activityParameters', 'activityParameters.activityTypeParameter', 'prices'],
    })

    const activityType = await result.activityType

    const customParameters = {}

    result.activityParameters.forEach((param) => {
      customParameters[param.activityTypeParameter.name] = param.value
    })

    const resultObj: Record<string, any> = {
      id: result.id,
      accepted: result.accepted,
      name: result.name,
      description: result.description,
      activityType: activityType.name,
      ...customParameters,
    }

    const price = getPrice(result)

    if (price) {
      resultObj.price = parseFloat(price.price)
    }

    return resultObj
  }

  async getAllActivityTypes() {
    return this.activityTypeRepository.find()
  }

  async getAllActivities(source: QueryActivity, userId: string) {
    const whereObj: Record<string, any> = {}

    switch (source) {
      case 'system':
        whereObj.accepted = true
        break
      case 'user':
        whereObj.userId = userId
        break
      case 'toAccept':
        whereObj.accepted = false
        break
      default:
        break
    }

    const results = await this.activityRepository.find({
      where: whereObj,
      relations: ['activityType', 'activityParameters', 'activityParameters.activityTypeParameter', 'prices'],
    })

    const transformedResults = []

    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      const activityType = await result.activityType

      const customParameters = {}

      result.activityParameters.forEach((param) => {
        customParameters[param.activityTypeParameter.name] = param.value
      })

      const resultObj: Record<string, any> = {
        id: result.id,
        accepted: result.accepted,
        name: result.name,
        description: result.description,
        activityType: activityType.name,
        ...customParameters,
      }

      const price = getPrice(result)

      if (price) {
        resultObj.price = parseFloat(price.price)
      }

      transformedResults.push(resultObj)
    }

    return transformedResults
  }

  async createRestaurant(body: ActivityDto, activityTypeId: string, activityId: string) {
    const placeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
      },
    })).id.toString()

    const restaurantPlace = this.activityParameterRepository.create({
      value: body.place,
      activityTypeParameterId: placeTypeParameterId,
      activityId,
    })
    await this.activityParameterRepository.save(restaurantPlace)
  }

  async createTravel(body: ActivityDto, activityTypeId: string, activityId: string) {
    const fromTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'from',
      },
    })).id.toString()

    const toTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'to',
      },
    })).id.toString()

    const travelParams = this.activityParameterRepository.create([
      {
        value: body.from,
        activityTypeParameterId: fromTypeParameterId,
        activityId,
      },
      {
        value: body.to,
        activityTypeParameterId: toTypeParameterId,
        activityId,
      },
    ])
    await this.activityParameterRepository.save(travelParams)

    const price = this.priceRepository.create({
      price: body.price,
      startDate: new Date(),
      activityId,
    })
    await this.priceRepository.save(price)
  }

  async createAttraction(body: ActivityDto, activityTypeId: string, activityId: string) {
    const placeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'place',
      },
    })).id.toString()

    const priceTypeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'priceType',
      },
    })).id.toString()

    const activityParams = this.activityParameterRepository.create([
      {
        value: body.place,
        activityTypeParameterId: placeTypeParameterId,
        activityId,
      },
      {
        value: body.priceType,
        activityTypeParameterId: priceTypeTypeParameterId,
        activityId,
      },
    ])
    await this.activityParameterRepository.save(activityParams)

    const price = this.priceRepository.create({
      price: body.price,
      startDate: new Date(),
      activityId,
    })
    await this.priceRepository.save(price)
  }

  async createAccommodation(body: ActivityDto, userId: string) {
    const accommodation = this.accommodationRepository.create({
      accepted: false,
      name: body.name,
      place: body.place,
      description: body.description,
      userId,
    })
    const result = await this.accommodationRepository.save(accommodation)

    const price = this.accommodationPriceRepository.create({
      price: body.price,
      startDate: new Date(),
      accommodationId: result.id.toString(),
    })
    await this.accommodationPriceRepository.save(price)

    return result
  }

  async createActivity(body: ActivityDto, userId: string) {
    const activityTypeResult = await this.activityTypeRepository.findOne({
      where: {
        name: body.activityType,
      },
    })
    const activityTypeId = activityTypeResult.id.toString()

    const activity = this.activityRepository.create({
      accepted: false,
      name: body.name,
      activityTypeId,
      description: body.description,
      userId,
    })
    const result = await this.activityRepository.save(activity)
    const activityId = result.id

    switch (body.activityType) {
      case 'Restauracja':
        await this.createRestaurant(body, activityTypeId.toString(), activityId.toString())
        break
      case 'Podróż':
        await this.createTravel(body, activityTypeId.toString(), activityId.toString())
        break
      case 'Atrakcja':
        await this.createAttraction(body, activityTypeId.toString(), activityId.toString())
        break
      default:
        break
    }

    return result
  }

  async getAllAccommodations(source: QueryActivity, userId: string) {
    const whereObj: Record<string, any> = {}

    switch (source) {
      case 'system':
        whereObj.accepted = true
        break
      case 'user':
        whereObj.userId = userId
        break
      case 'toAccept':
        whereObj.accepted = false
        break
      default:
        break
    }

    const results = await this.accommodationRepository.find({
      where: whereObj,
      relations: ['prices'],
    })

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      place: result.place,
      description: result.description,
      price: parseFloat(getPrice(result).price),
    }))
  }

  async getAccommodation(id: string) {
    const result = await this.accommodationRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      relations: ['prices'],
    })

    return {
      id: result.id,
      name: result.name,
      place: result.place,
      description: result.description,
      price: parseFloat(getPrice(result).price),
    }
  }

  async acceptActivity(id: string) {
    await this.activityRepository.save({
      id: parseInt(id, 10),
      accepted: true,
    })
    return HttpStatus.OK
  }

  async acceptAccommodation(id: string) {
    await this.accommodationRepository.save({
      id: parseInt(id, 10),
      accepted: true,
    })
    return HttpStatus.OK
  }

  async restoreActivity(id: string) {
    await this.activityRepository.softDelete({ id: parseInt(id, 10) })
    return HttpStatus.ACCEPTED
  }

  async restoreAccommodation(id: string) {
    await this.accommodationRepository.softDelete({ id: parseInt(id, 10) })
    return HttpStatus.ACCEPTED
  }

  async putAccommodation(id: string, body: ActivityDto) {
    const result = await this.accommodationRepository.save({
      id: parseInt(id, 10),
      name: body.name,
      place: body.place,
      description: body.description,
    })

    const price = this.accommodationPriceRepository.create({
      price: body.price,
      startDate: new Date(),
      accommodationId: id,
    })
    await this.accommodationPriceRepository.save(price)

    return result
  }

  async putRestaurant(body: ActivityDto, activityTypeId: string, activityId: string) {
    const placeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
      },
    })).id.toString()

    const placeParameterId = (await this.activityParameterRepository.findOne({
      where: {
        activityId,
        activityTypeParameterId: placeTypeParameterId,
      },
    })).id

    await this.activityParameterRepository.save({
      id: placeParameterId,
      value: body.place,
      activityTypeParameterId: placeTypeParameterId,
      activityId,
    })
  }

  async putTravel(body: ActivityDto, activityTypeId: string, activityId: string) {
    const fromTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'from',
      },
    })).id.toString()

    const fromParameterId = (await this.activityParameterRepository.findOne({
      where: {
        activityId,
        activityTypeParameterId: fromTypeParameterId,
      },
    })).id

    const toTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'to',
      },
    })).id.toString()

    const toParameterId = (await this.activityParameterRepository.findOne({
      where: {
        activityId,
        activityTypeParameterId: toTypeParameterId,
      },
    })).id

    await this.activityParameterRepository.save([
      {
        id: fromParameterId,
        value: body.from,
        activityTypeParameterId: fromTypeParameterId,
        activityId,
      },
      {
        id: toParameterId,
        value: body.to,
        activityTypeParameterId: toTypeParameterId,
        activityId,
      },
    ])

    const price = this.priceRepository.create({
      price: body.price,
      startDate: new Date(),
      activityId,
    })
    await this.priceRepository.save(price)
  }

  async putAttraction(body: ActivityDto, activityTypeId: string, activityId: string) {
    const placeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'place',
      },
    })).id.toString()

    const placeParameterId = (await this.activityParameterRepository.findOne({
      where: {
        activityId,
        activityTypeParameterId: placeTypeParameterId,
      },
    })).id

    const priceTypeTypeParameterId = (await this.activityTypeParameterRepository.findOne({
      where: {
        activityTypeId,
        name: 'priceType',
      },
    })).id.toString()

    const priceTypeParameterId = (await this.activityParameterRepository.findOne({
      where: {
        activityId,
        activityTypeParameterId: priceTypeTypeParameterId,
      },
    })).id

    await this.activityParameterRepository.save([
      {
        id: placeParameterId,
        value: body.place,
        activityTypeParameterId: placeTypeParameterId,
        activityId,
      },
      {
        id: priceTypeParameterId,
        value: body.priceType,
        activityTypeParameterId: priceTypeTypeParameterId,
        activityId,
      },
    ])

    const price = this.priceRepository.create({
      price: body.price,
      startDate: new Date(),
      activityId,
    })
    await this.priceRepository.save(price)
  }

  async putActivity(id: string, body: ActivityDto) {
    const activityTypeResultId = (await this.activityTypeRepository.findOne({
      where: {
        name: body.activityType,
      },
    })).id.toString()

    const result = await this.activityRepository.save({
      id: parseInt(id, 10),
      name: body.name,
      description: body.description,
    })

    switch (body.activityType) {
      case 'Restauracja':
        await this.putRestaurant(body, activityTypeResultId, id)
        break
      case 'Podróż':
        await this.putTravel(body, activityTypeResultId, id)
        break
      case 'Atrakcja':
        await this.putAttraction(body, activityTypeResultId, id)
        break
      default:
        break
    }

    return result
  }
}
