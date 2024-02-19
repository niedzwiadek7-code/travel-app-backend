import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy'
import { RoleEntity, UserEntity } from '../resources'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
