/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'
import { UserEntity } from './user.entity'
import { AnswerEntity } from './answer.entity'

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    question: string

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.questions,
    { onDelete: 'CASCADE' },
  )
    activity: ActivityEntity

  @ManyToOne(
    () => UserEntity,
    (user) => user.questions,
    { onDelete: 'CASCADE' },
  )
    author: UserEntity

  @OneToMany(
    () => AnswerEntity,
    (answer) => answer.question,
    { cascade: true },
  )
    answers: AnswerEntity[]

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
