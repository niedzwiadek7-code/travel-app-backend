/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationPrice } from './AccommodationPrice'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'

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

  @OneToMany(
    () => AccommodationElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.accommodation,
  )
    elementTravelInstances: AccommodationElementTravelInstance
}
