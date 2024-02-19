/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'
import { UserEntity } from './user.entity'
import { AnswerEntity } from './answer.entity'

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
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
