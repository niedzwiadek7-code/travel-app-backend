import { DeepPartial, Repository } from 'typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { createTestConfiguration } from '../../test/utils/createMemDB'
import entities, {
  User,
} from '../typeorm'

describe('AuthService', () => {
  let module: TestingModule
  let authService: AuthService
  let userRepository: Repository<User>

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

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfiguration(entities)),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'stub_access_token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'JWT_SECRET':
                  return 'JWT_SECRET'
                default:
                  return null
              }
            }),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))

    const initUsersTransformers = userRepository.create(initUsers)
    await userRepository.save(initUsersTransformers)
  })

  it('signToken', async () => {
    const result = await authService.signToken(1, 'mail@example.cmm')

    expect(JSON.stringify(result)).toBe(JSON.stringify({
      access_token: 'stub_access_token',
    }))
  })
})
