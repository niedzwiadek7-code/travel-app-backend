/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'

@Entity()
export class AccommodationElementTravelPhoto {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @Column()
    elementTravelId: string

  @ManyToOne(
    () => AccommodationElementTravelInstance,
    (elementTravel) => elementTravel.photos,
    { onDelete: 'CASCADE' },
  )
    elementTravel: AccommodationElementTravelInstance
}
