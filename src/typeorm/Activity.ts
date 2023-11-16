/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question'
import { Rating } from './Rating'
import { Price } from './Price'
import { ActivityType } from './ActivityType'
import { ActivityParameter } from './ActivityParameter'

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
    length: '5000',
  })
    description: string

  @ManyToOne(() => ActivityType)
  @JoinTable()
    activityType: ActivityType

  @Column()
    activityTypeId: string

  @OneToMany(() => Price, (price) => price.activity)
    prices: Price[]

  @OneToMany(() => Question, (question) => question.activity)
    questions: Question[]

  @OneToMany(() => Rating, (rating) => rating.activity)
    ratings: Rating[]

  @OneToMany(() => ActivityParameter, (activityParameter) => activityParameter.activity)
    activityParameters: ActivityParameter[]
}
