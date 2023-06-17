/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './Question.entity'
import { UserEntity } from './User.entity'

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    answer: string

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
    question: Promise<QuestionEntity>

  @Column()
    questionId: string

  @ManyToOne(() => UserEntity)
  @JoinTable()
    author: Promise<UserEntity>

  @Column()
    authorId: string

  @ManyToMany(() => UserEntity)
  @JoinTable()
    likes: UserEntity[]

  @ManyToMany(() => UserEntity)
  @JoinTable()
    dislikes: UserEntity[]
}
