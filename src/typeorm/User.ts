/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Question } from './Question'

export enum UserRole {
  USER = 'USER',
  TRAVEL_AGENCY = 'TRAVEL_AGENCY',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    firstName: string

  @Column({
    nullable: false,
  })
    lastName: string

  @Column({
    nullable: false,
  })
    email: string

  @Column({
    nullable: false,
  })
    password: string

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.USER,
  })
    role: UserRole

  @OneToMany(() => TravelRecipe, (travel) => travel.user)
    travels: TravelRecipe[]

  @OneToMany(() => Question, (question) => question.author)
    questions: Question[]
}
