/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question'
import { User } from './User'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    answer: string

  @ManyToOne(() => Question, (question) => question.answers)
    question: Question

  @ManyToOne(() => User)
  @JoinTable()
    author: User
}
