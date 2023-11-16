import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PlaceModule } from './place/place.module'
import { TravelModule } from './travel/travel.module'
import { QuestionModule } from './question/question.module'
import { ActivityModule } from './activity/activity.module';
import entities from './typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities,
      synchronize: true,
    }),
    PlaceModule,
    TravelModule,
    QuestionModule,
    ActivityModule,
  ],
})
export class AppModule {}
