/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameterEntity } from './ActivityTypeParameter.entity'

@Entity()
export class ActivityParameterEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    value: string

  @ManyToOne(
    () => ActivityTypeParameterEntity,
    (activityTypeParameter) => activityTypeParameter.activityParameters,
  )
    activityTypeParameter: ActivityTypeParameterEntity
}
