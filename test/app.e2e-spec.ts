import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/prisma/prisma.service'
import * as pactum from 'pactum'
import { AuthDto } from '../src/modules/auth/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }))
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Auth', () => {
    describe('Signup', () => {
      it('should throw if email empty', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: '12345678',
        })
        .expectStatus(400))

      it('should throw if password empty', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: 'mail@example.com',
        })
        .expectStatus(400))

      it('should throw if no body provided', () => pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400))

      it('should signup', () => {
        const dto: AuthDto = {
          email: 'efpyi@example.com',
          password: '12345678',
        }

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe('Signin', () => {
      it('should throw if email empty', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: '12345678',
        })
        .expectStatus(400))

      it('should throw if password empty', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: 'mail@example.com',
        })
        .expectStatus(400))

      it('should throw if no body provided', () => pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400))

      it('should signin', () => {
        const dto: AuthDto = {
          email: 'efpyi@example.com',
          password: '12345678',
        }

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {

    })

    describe('Edit user', () => {

    })
  })

  describe('Location', () => {
    describe('Create location', () => {

    })

    describe('Get location', () => {

    })

    describe('Get location by id', () => {

    })

    describe('Edit location', () => {

    })

    describe('Delete location', () => {

    })
  })
})
