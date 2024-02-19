/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { AccommodationElementTravelInstanceEntity } from './accommodation-element-travel-instance.entity'
import { AccommodationEntity } from './accommodation.entity'

@Entity()
export class AccommodationRatingEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    text: string

  @ManyToOne(() => UserEntity)
  @JoinTable()
    author: UserEntity

  @Column()
    authorId: string

  @Column()
    accommodationId: string

  @ManyToOne(() => AccommodationEntity, (accommodation) => accommodation.ratings)
    accommodation: AccommodationEntity

  @Column()
    elementTravelId: string

  @OneToOne(() => AccommodationElementTravelInstanceEntity, (instance) => instance.rating)
  @JoinColumn()
    elementTravel: AccommodationElementTravelInstanceEntity

  @Column({
    type: 'boolean',
    default: false,
  })
    sharePhotos: boolean
}
