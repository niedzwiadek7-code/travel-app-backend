import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TravelRecipe, User } from '../../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelRecipe, User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
