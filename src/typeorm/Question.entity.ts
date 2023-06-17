/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './Activity.entity'
import { UserEntity } from './User.entity'
import { AnswerEntity } from './Answer.entity'

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    question: string

  @ManyToOne(() => ActivityEntity, (activity) => activity.questions)
    activity: ActivityEntity

  @ManyToOne(() => UserEntity, (user) => user.questions)
    author: UserEntity

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
    answers: AnswerEntity[]

  @ManyToMany(() => UserEntity)
  @JoinTable()
    likes: UserEntity[]

  @ManyToMany(() => UserEntity)
  @JoinTable()
    dislikes: UserEntity[]
}
