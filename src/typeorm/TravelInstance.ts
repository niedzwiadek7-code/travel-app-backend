/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { ElementTravelInstance } from './ElementTravelInstance'
import { User } from './User'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'

@Entity()
export class TravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    userId: string

  @ManyToOne(() => User, (user) => user.travelInstances)
    user: User

  @Column()
    travelRecipeId: string

  @ManyToOne(() => TravelRecipe, (travelRecipe) => travelRecipe.travelInstances)
    travelRecipe: TravelRecipe

  @Column('date')
    from: Date

  @Column('date')
    to: Date

  @OneToMany(
    () => ElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    travelElements: ElementTravelInstance[]

  @OneToMany(
    () => AccommodationElementTravelInstance,
    (elementTravelInstance) => elementTravelInstance.travelInstance,
  )
    accommodationElements: AccommodationElementTravelInstance[]
}
