import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { PlaceModule } from './modules/place/place.module'
import { TravelModule } from './modules/travel/travel.module'
import { QuestionModule } from './modules/question/question.module'
import { typeormConfig } from './config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(typeormConfig),
    PlaceModule,
    TravelModule,
    QuestionModule,
  ],
})
export class AppModule {}
