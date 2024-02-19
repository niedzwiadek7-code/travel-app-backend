/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameterEntity } from './activity-type-parameter.entity'
import { ActivityEntity } from './activity.entity'

@Entity()
export class ActivityParameterEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    value: string

  @Column()
    activityId: string

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.activityParameters,
  )
    activity: ActivityEntity

  @Column()
    activityTypeParameterId: string

  @ManyToOne(
    () => ActivityTypeParameterEntity,
    (activityTypeParameter) => activityTypeParameter.activityParameters,
  )
    activityTypeParameter: ActivityTypeParameterEntity
}
