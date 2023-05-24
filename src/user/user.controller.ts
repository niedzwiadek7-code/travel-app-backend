import {
  Controller, Get, Patch, UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { User } from '../typeorm'
import { GetUser } from '../auth/decorator'

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get()
  get(@GetUser() user: User) {
    return user
  }

  @Patch()
  editUser() {}
}
