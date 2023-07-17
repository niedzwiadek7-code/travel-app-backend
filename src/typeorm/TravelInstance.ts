/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Column,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { DateRange } from './DateRange'
import { ElementTravelInstance } from './ElementTravelInstance'

@Entity()
export class TravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    type: 'integer',
  })
    dayNumber: number

  @ManyToOne(() => TravelRecipe, (travelRecipe) => travelRecipe.travelInstances)
    travelRecipe: TravelRecipe

  @Column()
    travelRecipeId: number

  @ManyToOne(() => DateRange)
  @JoinTable()
    dateRange: DateRange

  @OneToMany(
    () => ElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    travelElements: ElementTravelInstance[]
}
