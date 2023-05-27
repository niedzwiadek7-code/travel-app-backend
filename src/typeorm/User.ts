/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Travel } from './Travel'
import { Question } from './Question'

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

  @OneToMany(() => Travel, (travel) => travel.user)
    travels: Travel[]

  @OneToMany(() => Question, (question) => question.author)
    questions: Question[]
}
