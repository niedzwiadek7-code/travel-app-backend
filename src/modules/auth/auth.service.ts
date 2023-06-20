import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthDto, RegisterDto } from './dto'
import { User as UserEntity } from '../../typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    const pwMatches = await argon.verify(user.password, dto.password)

    if (!pwMatches) {
      throw new UnauthorizedException()
    }

    return this.signToken(user.id, user.email)
  }

  async signup(dto: RegisterDto) {
    const hash = await argon.hash(dto.password)
    const user = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hash,
    })
    await this.userRepository.save(user)

    return this.signToken(user.id, user.email)
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }

    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    })

    return {
      access_token: token,
    }
  }
}
