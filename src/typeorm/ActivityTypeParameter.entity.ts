/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityType } from './ActivityType.entity'
import { ActivityParameter } from './ActivityParameter.entity'

@Entity()
export class ActivityTypeParameter {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @ManyToOne(() => ActivityType, (activityType) => activityType.activityTypeParameters)
    activityType: ActivityType

  @OneToMany(
    () => ActivityParameter,
    (activityParameter) => activityParameter.activityTypeParameter,
  )
    activityParameters: ActivityParameter[]
}
