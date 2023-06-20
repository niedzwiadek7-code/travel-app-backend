/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameter } from './ActivityTypeParameter.entity'

@Entity()
export class ActivityParameter {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    value: string

  @ManyToOne(
    () => ActivityTypeParameter,
    (activityTypeParameter) => activityTypeParameter.activityParameters,
  )
    activityTypeParameter: ActivityTypeParameter
}
