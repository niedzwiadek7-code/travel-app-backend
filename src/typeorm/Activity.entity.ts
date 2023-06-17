/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './Question.entity'
import { RatingEntity } from './Rating.entity'
import { PriceEntity } from './Price.entity'
import { ActivityTypeEntity } from './ActivityType.entity'

@Entity()
export class ActivityEntity {
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

  @ManyToOne(() => ActivityTypeEntity)
  @JoinTable()
    activityType: Promise<ActivityTypeEntity>

  @Column()
    activityTypeId: string

  @OneToMany(() => PriceEntity, (price) => price.activity)
    prices: PriceEntity[]

  @OneToMany(() => QuestionEntity, (question) => question.activity)
    questions: QuestionEntity[]

  @OneToMany(() => RatingEntity, (rating) => rating.activity)
    ratings: RatingEntity[]
}
