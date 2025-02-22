import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../../resources'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: true,
    })
  }

  async validate(payload: {
    sub: number,
    email: string,
  }) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
      relations: ['roles'],
    })
    delete user.password
    return {
      ...user,
      roles: user.roles.map((role) => role.role),
    }
  }
}
