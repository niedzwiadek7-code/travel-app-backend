/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { QuestionEntity } from './question.entity'
import { RoleEntity } from './role.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { ActivityEntity } from './activity.entity'
import { AccommodationEntity } from './accommodation.entity'

@Entity()
export class UserEntity {
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
    unique: true,
  })
    email: string

  @Column({
    nullable: false,
  })
    password: string

  @ManyToMany(
    () => RoleEntity,
    (role) => role.users,
    { cascade: true },
  )
  @JoinTable()
    roles: RoleEntity[]

  @OneToMany(
    () => TravelRecipeEntity,
    (travel) => travel.user,
  )
    travels: TravelRecipeEntity[]

  @OneToMany(
    () => TravelInstanceEntity,
    (travel) => travel.user,
  )
    travelInstances: TravelInstanceEntity[]

  @OneToMany(
    () => QuestionEntity,
    (question) => question.author,
  )
    questions: QuestionEntity[]

  @OneToMany(
    () => ActivityEntity,
    (activity) => activity.user,
  )
    activities: ActivityEntity[]

  @OneToMany(
    () => AccommodationEntity,
    (accommodation) => accommodation.user,
  )
    accommodations: AccommodationEntity[]
}
