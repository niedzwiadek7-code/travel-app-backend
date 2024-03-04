/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeParameterEntity } from './activity-type-parameter.entity'

@Entity()
export class ActivityTypeEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @OneToMany(
    () => ActivityTypeParameterEntity,
    (activityTypeParameter) => activityTypeParameter.activityType,
    { cascade: true },
  )
    activityTypeParameters: ActivityTypeParameterEntity[]
}
