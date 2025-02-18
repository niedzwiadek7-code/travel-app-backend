import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { faker } from '@faker-js/faker'
import * as argon from 'argon2'
import * as path from 'path'
import * as fs from 'fs/promises'
import * as process from 'node:process'
import { RoleEntity, UserEntity } from '../../resources'

interface JsonUser {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private dataSource: DataSource,
  ) {}

  async seed() {
    await this.resetUsers()
    await this.resetRoles()

    const jsonPath = path.join(__dirname, 'initialData', 'users.json')
    await this.generateRoles()
    await this.generateAdmin()
    await this.seedFromJson(jsonPath)

    if (process.env.WITH_FACTORY !== 'true') {
      return
    }

    const promises = []

    const count = parseInt(process.env.FACTORY_SIZE, 10) || 1

    for (let i = 0; i < count; i += 1) {
      promises.push(this.generateUsers())
    }

    await Promise.all(promises)
  }

  async resetUsers() {
    await this.dataSource.query(`TRUNCATE TABLE ${process.env.DATABASE_SCHEMA}.user RESTART IDENTITY CASCADE;`)
  }

  async resetRoles() {
    await this.dataSource.query(`TRUNCATE TABLE ${process.env.DATABASE_SCHEMA}.role RESTART IDENTITY CASCADE;`)
  }

  async hashPassword(password: string): Promise<string> {
    return argon.hash(password)
  }

  async seedFromJson(filePath: string) {
    try {
      const rawData = await fs.readFile(filePath, 'utf8')
      const usersData: JsonUser[] = JSON.parse(rawData)

      const promises = []

      const createUser = async (userData: JsonUser) => {
        const user = new UserEntity()
        user.firstName = userData.firstName
        user.lastName = userData.lastName
        user.email = userData.email
        user.password = await this.hashPassword(userData.password)

        user.roles = await Promise.all(
          userData.roles.map(
            (roleName) => this.roleRepository.findOne({ where: { role: roleName } }),
          ),
        )

        await this.userRepository.save(user)
      }

      usersData.forEach((userData) => {
        promises.push(createUser(userData))
      })

      await Promise.all(promises)
    } catch (error) {
      console.error(error)
    }
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
