import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PlaceModule } from './place/place.module'
import { TravelModule } from './travel/travel.module'
import { QuestionModule } from './question/question.module'
import { dataSourceOptions } from '../db/data-source'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    PlaceModule,
    TravelModule,
    QuestionModule,
  ],
})
export class AppModule {}
