import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TravelModule } from './travel/travel.module'
import { QuestionModule } from './question/question.module'
import { ActivityModule } from './activity/activity.module'
import { RatingModule } from './rating/rating.module'
import { dataSourceOptions } from './db/data-source'
import { AppController } from './app.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dataSourceOptions,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TravelModule,
    QuestionModule,
    ActivityModule,
    RatingModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
