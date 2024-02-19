/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    role: string

  @ManyToMany(() => UserEntity)
  @JoinTable()
    users: UserEntity[]
}
