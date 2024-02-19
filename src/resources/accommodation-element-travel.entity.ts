/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { AccommodationEntity } from './accommodation.entity'

@Entity()
export class AccommodationElementTravelEntity {
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

  @ManyToOne(() => TravelRecipeEntity, (travel) => travel.travelElements)
    travel: TravelRecipeEntity

  @Column()
    accommodationId: string

  @ManyToOne(() => AccommodationEntity)
  @JoinTable()
    accommodation: AccommodationEntity
}
