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
  })

  describe('Get', () => {
    it('should return an array of labels', async () => {
      await userRepository.save({
        id: 1,
        firstName: 'Damian',
        lastName: 'Kliber',
        email: 'damiankliber@gmail.com',
        password: 'password',
      })

      const all = await userRepository.find()

      const fetchedUser = await userService.getById(1)

      console.log(fetchedUser)

      // console.log(all)

      // const a = await userRepository.find({
      //   where: {
      //     id: 1,
      //   },
      // })
      // console.log('kjldfjksfjlksdfjlksd')
      // console.log(a)
      // const result = ['test']
      // jest.spyOn(userService, 'findAll').mockImplementation(() => result)
      //
      // expect(await labelController.root()).toBe(result)
    })
  })
})
