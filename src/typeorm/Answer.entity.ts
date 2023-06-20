/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question.entity'
import { User } from './User.entity'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    answer: string

  @ManyToOne(() => Question, (question) => question.answers)
    question: Promise<Question>

  @Column()
    questionId: string

  @ManyToOne(() => User)
  @JoinTable()
    author: Promise<User>

  @Column()
    authorId: string

  @ManyToMany(() => User)
  @JoinTable()
    likes: User[]

  @ManyToMany(() => User)
  @JoinTable()
    dislikes: User[]
}
