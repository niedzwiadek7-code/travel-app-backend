/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe.entity'
import { DateRange } from './DateRange.entity'
import { ElementTravelInstance } from './ElementTravelInstance.entity'

@Entity()
export class TravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => TravelRecipe, (travelRecipe) => travelRecipe.travelInstances)
    travelRecipe: TravelRecipe

  @ManyToOne(() => DateRange)
  @JoinTable()
    dateRange: DateRange

  @OneToMany(
    () => ElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    travelElements: ElementTravelInstance[]
}
