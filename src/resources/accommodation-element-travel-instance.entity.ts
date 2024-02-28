/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn,
} from 'typeorm'
import { TravelInstanceEntity } from './travel-instance.entity'
import { AccommodationElementTravelPhotoEntity } from './accommodation-element-travel-photo.entity'
import { AccommodationEntity } from './accommodation.entity'
import { AccommodationElementTravelEntity } from './accommodation-element-travel.entity'
import { AccommodationRatingEntity } from './accommodation-rating.entity'

@Entity()
export class AccommodationElementTravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
  })
    passed: boolean

  @OneToMany(
    () => AccommodationElementTravelPhotoEntity,
    (elementTravelPhoto) => elementTravelPhoto.elementTravel,
  )
    photos: AccommodationElementTravelPhotoEntity[]

  @Column()
    travelInstanceId: string

  @ManyToOne(
    () => TravelInstanceEntity,
    (travelInstance) => travelInstance.accommodationElements,
    { onDelete: 'CASCADE' },
  )
    travelInstance: TravelInstanceEntity

  @Column()
    accommodationId: string

  @ManyToOne(
    () => AccommodationEntity,
    (accommodation) => accommodation.elementTravelInstances,
    { onDelete: 'CASCADE' },
  )
    accommodation: AccommodationEntity

  @Column({
    nullable: true,
  })
    elementTravelId?: string

  @ManyToOne(
    () => AccommodationElementTravelEntity,
    { onDelete: 'SET NULL' },
  )
    elementTravel?: AccommodationElementTravelEntity

  @OneToOne(
    () => AccommodationRatingEntity,
    (rating) => rating.accommodation,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn()
    rating?: AccommodationRatingEntity
}
