/* eslint-disable import/no-cycle */

import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { QuestionEntity } from './question.entity'
import { RatingEntity } from './rating.entity'
import { PriceEntity } from './price.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { UserEntity } from './user.entity'
import { AccommodationEntity } from './accommodation.entity'
import { TripEntity } from './trip.entity'
import { RestaurantEntity } from './restaurant.entity'
import { AttractionEntity } from './attraction.entity'
import { ActivityType } from '../activity/types'

@Entity('activity')
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

  @Column({
    nullable: false,
    enum: ['Restaurant', 'Attraction', 'Trip', 'Accommodation'],
  })
    activityType: ActivityType

  @OneToMany(
    () => PriceEntity,
    (price) => price.activity,
    { cascade: true },
  )
    prices: PriceEntity[]

  @OneToMany(
    () => QuestionEntity,
    (question) => question.activity,
    { cascade: true },
  )
    questions: QuestionEntity[]

  @OneToMany(
    () => RatingEntity,
    (rating) => rating.activity,
    { cascade: true },
  )
    ratings: RatingEntity[]

  @OneToMany(
    () => ElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.activity,
    { cascade: true },
  )
    elementTravelInstances: ElementTravelInstanceEntity[]

  @Column()
    userId: number

  @ManyToOne(
    () => UserEntity,
    (user) => user.activities,
    { onDelete: 'CASCADE' },
  )
    user: UserEntity

  @OneToOne(
    () => AccommodationEntity,
    (accommodation) => accommodation.activity,
    { cascade: true },
  )
    accommodation?: AccommodationEntity

  @OneToOne(
    () => TripEntity,
    (trip) => trip.activity,
    { cascade: true },
  )
    trip?: TripEntity

  @OneToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.activity,
    { cascade: true },
  )
    restaurant?: RestaurantEntity

  @OneToOne(
    () => AttractionEntity,
    (attraction) => attraction.activity,
    { cascade: true },
  )
    attraction?: AttractionEntity

  @DeleteDateColumn()
    deleteAt?: Date
}
