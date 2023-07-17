import { DeepPartial, Repository } from 'typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { createTestConfiguration } from '../../test/utils/createMemDB'
import entities, {Place, TravelRecipe, User} from '../typeorm'

describe('UserService', () => {
  let module: TestingModule
  let userService: UserService
  let userRepository: Repository<User>
  let travelRepository: Repository<TravelRecipe>
  let placeRepository: Repository<Place>

  const initPlaces: DeepPartial<Place>[] = [
    {
      id: 1,
      name: 'Nazwa',
      longitude: '30',
      latitude: '45',
      address: 'Some Address 14',
      zipCode: '45-456',
      city: 'Wrocław',
      country: 'Polska',
    },
  ]

  const initUsers: DeepPartial<User>[] = [
    {
      id: 1,
      firstName: 'Damian',
      lastName: 'Kliber',
      email: 'damiankliber@localhost.com',
      password: 'password',
    },
    {
      id: 2,
      firstName: 'Szymon',
      lastName: 'Adamczyk',
      email: 'szymonadamczyk@localhost.com',
      password: 'password',
    },
  ]

  const initTravels: DeepPartial<TravelRecipe>[] = [
    {
      id: 1,
      name: 'Wycieczka',
      placeId: 1,
      userId: 2,
    },
  ]

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfiguration(entities)),
        TypeOrmModule.forFeature([User, TravelRecipe, Place]),
      ],
      providers: [UserService],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    travelRepository = module.get<Repository<TravelRecipe>>(getRepositoryToken(TravelRecipe))
    placeRepository = module.get<Repository<Place>>(getRepositoryToken(Place))

    const initPlacesTransformers = placeRepository.create(initPlaces)
    await placeRepository.save(initPlacesTransformers)

    const initUsersTransformers = userRepository.create(initUsers)
    await userRepository.save(initUsersTransformers)

    const initTravelRecipeTransfromers = travelRepository.create(initTravels)
    await travelRepository.save(initTravelRecipeTransfromers)
  })

  it('getById', async () => {
    const result = await userService.getById(1)

    // // {
    // {

    // }
    // // }

    expect(result).toBe({
      id: 1,
      firstName: 'Damian',
      lastName: 'Kliber',
      email: 'damiankliber@localhost.com',
      password: 'password',
      role: 'USER',
    })
  })
})
