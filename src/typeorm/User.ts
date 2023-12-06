/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Question } from './Question'
import { UserRole } from './UserRole'
import { TravelInstance } from './TravelInstance'

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

  @ManyToOne(() => UserRole)
  @JoinTable()
    role: UserRole

  @OneToMany(() => TravelRecipe, (travel) => travel.user)
    travels: TravelRecipe[]

  @OneToMany(() => TravelInstance, (travel) => travel.user)
    travelInstances: TravelInstance[]

  @OneToMany(() => Question, (question) => question.author)
    questions: Question[]
}
