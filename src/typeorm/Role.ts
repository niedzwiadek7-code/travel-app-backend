/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    role: string

  @ManyToMany(() => User)
  @JoinTable()
    users: User[]
}
