/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Place } from './Place'
import { ElementTravel } from './ElementTravel'

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => User, (user) => user.travels)
    user: User

  @ManyToOne(() => Place)
  @JoinTable()
    place: Place

  @OneToMany(() => ElementTravel, (elementTravel) => elementTravel.travel)
    travelElements: ElementTravel[]
}
