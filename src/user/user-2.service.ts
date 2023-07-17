import { Repository, Connection } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { createMemDB } from '../../test/utils/createMemDB'

describe.skip('UserService', () => {
  let db: Connection
  let userService: UserService
  let userRepository: Repository<User>

  beforeEach(async () => {
    db = createMemDB(entites)
    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('getById', async () => {
    await seedRepository(
      userRepository,
      stubDatabase,
    )

    console.log(userRepository)

    const fetchedUser = await userService.getById(2)

    expect(fetchedUser).toBe({
      id: 2,
      firstName: 'Damian',
      lastName: 'Kliber',
      email: 'damiankliber@email.com',
      password: 'anotherpassowrd',
      role: UserRole.USER,
      travels: [],
      questions: [],
    })

    console.log(fetchedUser)
  })
})
