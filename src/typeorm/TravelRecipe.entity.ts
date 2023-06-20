/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User.entity'
import { Place } from './Place.entity'
import { ElementTravel } from './ElementTravel.entity'
import { TravelInstance } from './TravelInstance.entity'

@Entity()
export class TravelRecipe {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @ManyToOne(() => User, (user) => user.travels)
    user: User

  @ManyToOne(() => Place)
  @JoinTable()
    place: Place

  @OneToMany(() => ElementTravel, (elementTravel) => elementTravel.travel)
    travelElements: ElementTravel[]

  @OneToMany(() => TravelInstance, (travelInstance) => travelInstance.travelRecipe)
    travelInstances: TravelInstance[]
}
