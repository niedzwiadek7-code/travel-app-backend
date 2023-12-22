/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Question } from './Question'
import { Role } from './Role'
import { TravelInstance } from './TravelInstance'
import { Activity } from './Activity'
import { Accommodation } from './Accommodation'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    firstName: string

  @Column({
    nullable: false,
  })
    lastName: string

  @Column({
    nullable: false,
  })
    email: string

  @Column({
    nullable: false,
  })
    password: string

  @ManyToMany(() => Role)
  @JoinTable()
    roles: Role[]

  @OneToMany(() => TravelRecipe, (travel) => travel.user)
    travels: TravelRecipe[]

  @OneToMany(() => TravelInstance, (travel) => travel.user)
    travelInstances: TravelInstance[]

  @OneToMany(() => Question, (question) => question.author)
    questions: Question[]

  @OneToMany(() => Activity, (activity) => activity.user)
    activities: Activity[]

  @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
    accommodations: Accommodation[]
}
