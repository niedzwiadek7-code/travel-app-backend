/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './TravelRecipe.entity'
import { DateRangeEntity } from './DateRange.entity'
import { ElementTravelInstanceEntity } from './ElementTravelInstance.entity'

@Entity()
export class TravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => TravelRecipeEntity, (travelRecipe) => travelRecipe.travelInstances)
    travelRecipe: TravelRecipeEntity

  @ManyToOne(() => DateRangeEntity)
  @JoinTable()
    dateRange: DateRangeEntity

  @OneToMany(
    () => ElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    travelElements: ElementTravelInstanceEntity[]
}
