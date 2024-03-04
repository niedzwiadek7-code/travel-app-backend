/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { UserEntity } from './user.entity'
import { AccommodationElementTravelInstanceEntity } from './accommodation-element-travel-instance.entity'

@Entity()
export class TravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    userId: string

  @ManyToOne(
    () => UserEntity,
    (user) => user.travelInstances,
    { onDelete: 'CASCADE' },
  )
    user: UserEntity

  @Column()
    travelRecipeId: string

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
    { cascade: true },
  )
    travelElements: ElementTravelInstanceEntity[]

  @OneToMany(
    () => AccommodationElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
    { cascade: true },
  )
    accommodationElements: AccommodationElementTravelInstanceEntity[]
}
