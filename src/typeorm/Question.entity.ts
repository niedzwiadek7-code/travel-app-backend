/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Activity } from './Activity.entity'
import { User } from './User.entity'
import { Answer } from './Answer.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    question: string

  @ManyToOne(() => Activity, (activity) => activity.questions)
    activity: Activity

  @ManyToOne(() => User, (user) => user.questions)
    author: User

  @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]

  @ManyToMany(() => User)
  @JoinTable()
    likes: User[]

  @ManyToMany(() => User)
  @JoinTable()
    dislikes: User[]
}
