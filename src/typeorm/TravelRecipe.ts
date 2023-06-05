/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Place } from './Place'
import { ElementTravel } from './ElementTravel'
import { TravelInstance } from './TravelInstance'

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
