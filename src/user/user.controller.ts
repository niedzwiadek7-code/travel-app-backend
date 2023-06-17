import {
  Controller, Get, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { UserEntity } from '../typeorm'
import { GetUser } from '../auth/decorator'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  get(@GetUser() user: UserEntity) {
    return user
  }

  @Get('travels')
  async getTravels(@GetUser() user: UserEntity) {
    return this.userService.getTravels(user.id)
  }
}
