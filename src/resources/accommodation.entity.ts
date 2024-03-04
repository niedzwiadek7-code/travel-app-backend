/* eslint-disable import/no-cycle */

import {
  Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationPriceEntity } from './accommodation-price.entity'
import { AccommodationElementTravelInstanceEntity } from './accommodation-element-travel-instance.entity'
import { UserEntity } from './user.entity'
import { AccommodationRatingEntity } from './accommodation-rating.entity'

@Entity()
export class AccommodationEntity {
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
  })
    place: string

  @Column({
    nullable: false,
    length: '5000',
  })
    description: string

  @OneToMany(
    () => AccommodationPriceEntity,
    (price) => price.accommodation,
    { cascade: true },
  )
    prices: AccommodationPriceEntity[]

  @OneToMany(
    () => AccommodationRatingEntity,
    (rating) => rating.accommodation,
    { cascade: true },
  )
    ratings: AccommodationRatingEntity[]

  @OneToMany(
    () => AccommodationElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.accommodation,
    { cascade: true },
  )
    elementTravelInstances: AccommodationElementTravelInstanceEntity

  @Column()
    userId: string

  @ManyToOne(
    () => UserEntity,
    (user) => user.accommodations,
    { onDelete: 'CASCADE' },
  )
    user: UserEntity

  @DeleteDateColumn()
    deleteAt?: Date
}
