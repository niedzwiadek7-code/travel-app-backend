import {
  BadRequestException, ConflictException, HttpStatus, Injectable, UnauthorizedException,
} from '@nestjs/common'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthDto, RegisterDto } from './dto'
import { RoleEntity, UserEntity as UserEntity } from '../resources'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
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

    const roleResult = (await this.roleRepository.findOne({
      where: {
        role: 'user',
      },
    }))

    const role = new RoleEntity()
    role.id = roleResult.id
    role.role = roleResult.role

    const user = this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hash,
      roles: [role],
    })
    try {
      await this.userRepository.save(user)
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(err)
      }
      throw new BadRequestException(err)
    }

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
