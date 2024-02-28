/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { AccommodationElementTravelEntity } from './accommodation-element-travel.entity'

@Entity()
export class TravelRecipeEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column({
    nullable: false,
    type: 'int',
  })
    countDays: number

  @Column()
    userId: string

  @ManyToOne(() => UserEntity, (user) => user.travels)
    user: UserEntity

  // @ManyToOne(() => Place)
  // @JoinTable()
  //   place: Place

  @OneToMany(
    () => ElementTravelEntity,
    (elementTravel) => elementTravel.travel,
  )
    travelElements: ElementTravelEntity[]

  @OneToMany(
    () => AccommodationElementTravelEntity,
    (elementTravel) => elementTravel.travel,
  )
    accommodationTravelElements: AccommodationElementTravelEntity[]

  @OneToMany(
    () => TravelInstanceEntity,
    (travelInstance) => travelInstance.travelRecipe,
  )
    travelInstances: TravelInstanceEntity[]
}
