/* eslint-disable import/no-cycle */

import {
  Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationPrice } from './AccommodationPrice'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'
import { User } from './User'
import { Rating } from './Rating'
import { AccommodationRating } from './AccommodationRating'

@Entity()
export class Accommodation {
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

  @OneToMany(() => AccommodationPrice, (price) => price.accommodation)
    prices: AccommodationPrice[]

  @OneToMany(() => AccommodationRating, (rating) => rating.accommodation)
    ratings: AccommodationRating[]

  @OneToMany(
    () => AccommodationElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.accommodation,
  )
    elementTravelInstances: AccommodationElementTravelInstance

  @Column()
    userId: string

  @ManyToOne(() => User, (user) => user.accommodations)
    user: User

  @DeleteDateColumn()
    deleteAt?: Date
}
