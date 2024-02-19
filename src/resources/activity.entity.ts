/* eslint-disable import/no-cycle */

import {
  Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './question.entity'
import { RatingEntity } from './rating.entity'
import { PriceEntity } from './price.entity'
import { ActivityTypeEntity } from './activity-type.entity'
import { ActivityParameterEntity } from './activity-parameter.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { UserEntity } from './user.entity'

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
    length: '5000',
  })
    description: string

  @ManyToOne(() => ActivityTypeEntity)
  @JoinTable()
    activityType: ActivityTypeEntity

  @Column()
    activityTypeId: string

  @OneToMany(() => PriceEntity, (price) => price.activity)
    prices: PriceEntity[]

  @OneToMany(() => QuestionEntity, (question) => question.activity)
    questions: QuestionEntity[]

  @OneToMany(() => RatingEntity, (rating) => rating.activity)
    ratings: RatingEntity[]

  @OneToMany(() => ActivityParameterEntity, (activityParameter) => activityParameter.activity)
    activityParameters: ActivityParameterEntity[]

  @OneToMany(() => ElementTravelInstanceEntity, (elementTravelInstance) => elementTravelInstance.activity)
    elementTravelInstances: ElementTravelInstanceEntity[]

  @Column()
    userId: string

  @ManyToOne(() => UserEntity, (user) => user.activities)
    user: UserEntity

  @DeleteDateColumn()
    deleteAt?: Date
}
