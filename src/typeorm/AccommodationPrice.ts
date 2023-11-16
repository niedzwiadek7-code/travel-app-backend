/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Accommodation } from './Accommodation'

@Entity()
export class AccommodationPrice {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'float',
  })
    price: number

  @Column({
    nullable: false,
    type: 'date',
  })
    startDate: Date

  @Column()
    accommodationId: string

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.prices)
    accommodation: Accommodation
}
