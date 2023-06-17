/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeEntity } from './ActivityType.entity'
import { ActivityParameterEntity } from './ActivityParameter.entity'

@Entity()
export class ActivityTypeParameterEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @ManyToOne(() => ActivityTypeEntity, (activityType) => activityType.activityTypeParameters)
    activityType: ActivityTypeEntity

  @OneToMany(
    () => ActivityParameterEntity,
    (activityParameter) => activityParameter.activityTypeParameter,
  )
    activityParameters: ActivityParameterEntity[]
}
