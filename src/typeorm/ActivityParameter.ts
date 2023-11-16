/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameter } from './ActivityTypeParameter'
import { Activity } from './Activity'

@Entity()
export class ActivityParameter {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    value: string

  @Column()
    activityId: string

  @ManyToOne(
    () => Activity,
    (activity) => activity.activityParameters,
  )
    activity: Activity

  @Column()
    activityTypeParameterId: string

  @ManyToOne(
    () => ActivityTypeParameter,
    (activityTypeParameter) => activityTypeParameter.activityParameters,
  )
    activityTypeParameter: ActivityTypeParameter
}
