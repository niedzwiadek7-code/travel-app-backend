import { NestFactory } from '@nestjs/core'
import { AppModule } from '../../app.module'
import { UserSeederService } from './user-seeder.service'
import { ActivitySeederService } from './activity-seeder.service'

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule)
  const allSeeders = [
    UserSeederService,
    ActivitySeederService,
  ]

  // const promises = []

  for (const seeder of allSeeders) {
    const service = app.get(seeder)
    await service.seed()
  }

  // allSeeders.map((seeder) => {
  //   const service = app.get(seeder)
  //   promises.push(service.seed())
  // })
  //
  // await Promise.all(promises)
  await app.close()
}

bootstrap()
