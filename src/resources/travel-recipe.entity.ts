/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { TravelInstanceEntity } from './travel-instance.entity'

@Entity('travel_recipe')
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
    () => TravelInstanceEntity,
    (travelInstance) => travelInstance.travelRecipe,
    { cascade: true },
  )
    travelInstances: TravelInstanceEntity[]
}
