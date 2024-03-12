/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './question.entity'
import { UserEntity } from './user.entity'

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    answer: string

  @ManyToOne(
    () => QuestionEntity,
    (question) => question.answers,
    { onDelete: 'CASCADE' },
  )
    question: Promise<QuestionEntity>

  @Column()
    questionId: string

  @ManyToOne(
    () => UserEntity,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
    author: UserEntity

  @Column()
    authorId: string

  @ManyToMany(
    () => UserEntity,
  )
  @JoinTable()
    likes: UserEntity[]

  @ManyToMany(
    () => UserEntity,
  )
  @JoinTable()
    dislikes: UserEntity[]
}
