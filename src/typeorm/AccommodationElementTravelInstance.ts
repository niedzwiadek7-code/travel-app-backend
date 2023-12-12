/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelInstance } from './TravelInstance'
import { AccommodationElementTravelPhoto } from './AccommodationElementTravelPhoto'
import { Accommodation } from './Accommodation'
import { AccommodationElementTravel } from './AccommodationElementTravel'

@Entity()
export class AccommodationElementTravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
  })
    passed: boolean

  @OneToMany(
    () => AccommodationElementTravelPhoto,
    (elementTravelPhoto) => elementTravelPhoto.elementTravel,
  )
    photos: AccommodationElementTravelPhoto[]

  @Column()
    travelInstanceId: string

  @ManyToOne(
    () => TravelInstance,
    (travelInstance) => travelInstance.accommodationElements,
    { onDelete: 'CASCADE' },
  )
    travelInstance: TravelInstance

  @Column()
    accommodationId: string

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.elementTravelInstances,
  )
    accommodation: Accommodation

  @Column({
    nullable: true,
  })
    elementTravelId?: string

  @ManyToOne(() => AccommodationElementTravel)
    elementTravel?: AccommodationElementTravel
}
