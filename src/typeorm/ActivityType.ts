/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameter } from './ActivityTypeParameter'

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @OneToMany(
    () => ActivityTypeParameter,
    (activityTypeParameter) => activityTypeParameter.activityType,
  )
    activityTypeParameters: ActivityTypeParameter[]
}
