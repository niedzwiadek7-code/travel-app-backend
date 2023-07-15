import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { User, TravelRecipe } from '../typeorm'
import { MockRepository } from '../../test/stubs/repository.mock'

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

    await userRepository.save(
      {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@email.com',
        password: 'password',
      },
    )

    console.log(userRepository)
  })

  it('getById', async () => {
    const fetchedUser = await userService.getById(1)

    console.log(fetchedUser)
  })
})
