import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TravelRecipeEntity, UserEntity } from '../resources'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TravelRecipeEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
