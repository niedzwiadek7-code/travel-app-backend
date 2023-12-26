/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'
import { Accommodation } from './Accommodation'

@Entity()
export class AccommodationRating {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    text: string

  @ManyToOne(() => User)
  @JoinTable()
    author: User

  @Column()
    authorId: string

  @Column()
    accommodationId: string

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.ratings)
    accommodation: Accommodation

  @Column()
    elementTravelId: string

  @OneToOne(() => AccommodationElementTravelInstance, (instance) => instance.rating)
    elementTravel: AccommodationElementTravelInstance

  @Column({
    type: 'boolean',
    default: false,
  })
    sharePhotos: boolean
}
