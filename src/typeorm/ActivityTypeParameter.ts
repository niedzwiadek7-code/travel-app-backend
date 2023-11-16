/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityType } from './ActivityType'
import { ActivityParameter } from './ActivityParameter'

@Entity()
export class ActivityTypeParameter {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column()
    activityTypeId: string

  @ManyToOne(() => ActivityType, (activityType) => activityType.activityTypeParameters)
    activityType: ActivityType

  @OneToMany(
    () => ActivityParameter,
    (activityParameter) => activityParameter.activityTypeParameter,
  )
    activityParameters: ActivityParameter[]
}
