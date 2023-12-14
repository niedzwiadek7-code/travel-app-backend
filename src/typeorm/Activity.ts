/* eslint-disable import/no-cycle */

import {
  Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { use } from 'passport'
import { Question } from './Question'
import { Rating } from './Rating'
import { Price } from './Price'
import { ActivityType } from './ActivityType'
import { ActivityParameter } from './ActivityParameter'
import { ElementTravelInstance } from './ElementTravelInstance'
import { User } from './User'
import { Accommodation } from './Accommodation'

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

  @OneToMany(() => ElementTravelInstance, (elementTravelInstance) => elementTravelInstance.activity)
    elementTravelInstances: ElementTravelInstance[]

  @Column()
    userId: string

  @ManyToOne(() => User, (user) => user.activities)
    user: User

  @DeleteDateColumn()
    deleteAt?: Date
}
