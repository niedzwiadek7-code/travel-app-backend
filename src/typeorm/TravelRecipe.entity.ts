/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './User.entity'
import { PlaceEntity } from './Place.entity'
import { ElementTravelEntity } from './ElementTravel.entity'
import { TravelInstanceEntity } from './TravelInstance.entity'

@Entity()
export class TravelRecipeEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @ManyToOne(() => UserEntity, (user) => user.travels)
    user: UserEntity

  @ManyToOne(() => PlaceEntity)
  @JoinTable()
    place: PlaceEntity

  @OneToMany(() => ElementTravelEntity, (elementTravel) => elementTravel.travel)
    travelElements: ElementTravelEntity[]

  @OneToMany(() => TravelInstanceEntity, (travelInstance) => travelInstance.travelRecipe)
    travelInstances: TravelInstanceEntity[]
}
