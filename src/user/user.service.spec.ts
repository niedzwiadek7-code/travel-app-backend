import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { TravelRecipe, User } from '../typeorm'
import { MockRepository, seedRepository } from '../../test/stubs/repository.mock'
import { UserRole } from '../typeorm/User'

describe('UserService', () => {
  let userService: UserService
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository<User>,
        },
        {
          provide: getRepositoryToken(TravelRecipe),
          useClass: MockRepository<TravelRecipe>,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('getById', async () => {
    await seedRepository(
      userRepository,
      [
        {
          id: 1,
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@email.com',
          password: 'password',
          role: UserRole.USER,
          travels: [],
          questions: [],
        },
        {
          id: 2,
          firstName: 'Damian',
          lastName: 'Kliber',
          email: 'damiankliber@email.com',
          password: 'anotherpassowrd',
          role: UserRole.USER,
          travels: [],
          questions: [],
        },
      ],
    )

    const all = await userRepository.find()

    console.log(all)

    const fetchedUser = await userService.getById(1)

    console.log(fetchedUser)
  })
})
