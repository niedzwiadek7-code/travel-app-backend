/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question'
import { Rating } from './Rating'
import { Price } from './Price'
import { ActivityType } from './ActivityType'

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'boolean',
  })
    accepted: boolean

  @Column({
    nullable: false,
  })
    name: string

  @Column({
    nullable: false,
    type: 'text',
  })
    description: string

  @ManyToOne(() => ActivityType)
  @JoinTable()
    activityType: Promise<ActivityType>

  @Column()
    activityTypeId: string

  @OneToMany(() => Price, (price) => price.activity)
    prices: Price[]

  @OneToMany(() => Question, (question) => question.activity)
    questions: Question[]

  @OneToMany(() => Rating, (rating) => rating.activity)
    ratings: Rating[]
}
