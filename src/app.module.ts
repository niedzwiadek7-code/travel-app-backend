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
import { AppController } from './app.controller'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { UserSeederService } from './db/seed/user-seeder.service'
import entities from './resources'
import { ActivitySeederService } from './db/seed/activity-seeder.service'

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
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UserModule,
    TravelModule,
    QuestionModule,
    ActivityModule,
    RatingModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    UserSeederService,
    ActivitySeederService,
  ],
})
export class AppModule {}
