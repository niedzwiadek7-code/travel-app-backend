import {
  Controller, Get, Param, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { User } from '../typeorm'
import { GetUser } from '../auth/decorator'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  get(@GetUser() user: User) {
    return user
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id)
  }

  @Get('travels')
  async getTravels(@GetUser() user: User) {
    return this.userService.getTravels(user.id)
  }
}
