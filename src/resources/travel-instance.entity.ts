/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { UserEntity } from './user.entity'

@Entity('travel_instance')
export class TravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    userId: number

  @ManyToOne(
    () => UserEntity,
    (user) => user.travelInstances,
    { onDelete: 'CASCADE' },
  )
    user: UserEntity

  @Column()
    travelRecipeId: number

  @ManyToOne(
    () => TravelRecipeEntity,
    (travelRecipe) => travelRecipe.travelInstances,
    { onDelete: 'CASCADE' },
  )
    travelRecipe: TravelRecipeEntity

  @Column('date')
    from: Date

  @Column('date')
    to: Date

  @OneToMany(
    () => ElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    travelElements: ElementTravelInstanceEntity[]
}
