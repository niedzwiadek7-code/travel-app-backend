/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationEntity } from './accommodation.entity'

@Entity()
export class AccommodationPriceEntity {
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

  @ManyToOne(
    () => AccommodationEntity,
    (accommodation) => accommodation.prices,
    { onDelete: 'CASCADE' },
  )
    accommodation: AccommodationEntity
}
