import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PlaceModule } from './place/place.module';
import { TravelModule } from './travel/travel.module';
import entities from './typeorm'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: 'mobile-app',
      username: 'root',
      password: '',
      entities,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlaceModule,
    TravelModule,
  ],
})
export class AppModule {}
