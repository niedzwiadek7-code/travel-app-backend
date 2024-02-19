/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './question.entity'
import { UserEntity } from './user.entity'

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
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
