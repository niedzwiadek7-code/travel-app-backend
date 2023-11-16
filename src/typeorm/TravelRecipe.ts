/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { ElementTravel } from './ElementTravel'
import { TravelInstance } from './TravelInstance'
import { AccommodationElementTravel } from './AccommodationElementTravel'

@Entity()
export class TravelRecipe {
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

  @ManyToOne(() => User, (user) => user.travels)
    user: User

  // @ManyToOne(() => Place)
  // @JoinTable()
  //   place: Place

  @OneToMany(() => ElementTravel, (elementTravel) => elementTravel.travel)
    travelElements: ElementTravel[]

  @OneToMany(() => AccommodationElementTravel, (elementTravel) => elementTravel.travel)
    accommodationTravelElements: AccommodationElementTravel[]

  @OneToMany(() => TravelInstance, (travelInstance) => travelInstance.travelRecipe)
    travelInstances: TravelInstance[]
}
