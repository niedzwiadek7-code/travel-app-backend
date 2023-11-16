/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Accommodation } from './Accommodation'

@Entity()
export class AccommodationElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    numberOfDays: number

  @Column({
    nullable: true,
    type: 'float',
  })
    price: number

  @Column({
    nullable: false,
    length: '5000',
  })
    description: string

  @Column()
    travelId: string

  @ManyToOne(() => TravelRecipe, (travel) => travel.travelElements)
    travel: TravelRecipe

  @Column()
    accommodationId: string

  @ManyToOne(() => Accommodation)
  @JoinTable()
    accommodation: Accommodation
}
