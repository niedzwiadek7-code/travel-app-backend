import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import * as argon from 'argon2'
import { RoleEntity, UserEntity } from '../../resources'

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async seed() {
    await this.resetUsers()
    await this.resetRoles()

    const count = parseInt(process.env.FACTORY_SIZE, 10) || 1
    await this.generateRoles()
    await this.generateAdmin()

    const promises = []

    for (let i = 0; i < count; i += 1) {
      promises.push(this.generateUsers())
    }

    await Promise.all(promises)
  }

  async resetUsers() {
    await this.userRepository.delete({})
  }

  async resetRoles() {
    await this.roleRepository.delete({})
  }

  async hashPassword(password: string): Promise<string> {
    return argon.hash(password)
  }

  async generateRoles() {
    const role = new RoleEntity()
    role.role = 'user'
    await this.roleRepository.save(role)

    const role2 = new RoleEntity()
    role2.role = 'admin'
    await this.roleRepository.save(role2)
  }

  async generateUsers() {
    const user = new UserEntity()
    user.firstName = faker.person.firstName()
    user.lastName = faker.person.lastName()
    user.email = faker.internet.email()
    user.password = await this.hashPassword(faker.internet.password())
    user.roles = [await this.roleRepository.findOne({
      where: {
        role: 'user',
      },
    })]

    await this.userRepository.save(user)
  }

  async generateAdmin() {
    const admin = new UserEntity()
    admin.firstName = 'Admin'
    admin.lastName = 'Admin'
    admin.email = 'admin@admin.com'
    admin.password = await this.hashPassword('admin123')
    admin.roles = [
      await this.roleRepository.findOne({
        where: {
          role: 'user',
        },
      }),
      await this.roleRepository.findOne({
        where: {
          role: 'admin',
        },
      }),
    ]

    await this.userRepository.save(admin)
  }
}
