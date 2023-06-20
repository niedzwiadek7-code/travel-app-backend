/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe.entity'
import { Question } from './Question.entity'
import { UserRole } from './UserRole.entity'

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

  @OneToMany(() => Question, (question) => question.author)
    questions: Question[]
}
