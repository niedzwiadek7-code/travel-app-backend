/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityTypeEntity } from './activity-type.entity'
import { ActivityParameterEntity } from './activity-parameter.entity'

@Entity()
export class ActivityTypeParameterEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column()
    activityTypeId: string

  @ManyToOne(
    () => ActivityTypeEntity,
    (activityType) => activityType.activityTypeParameters,
    { onDelete: 'CASCADE' },
  )
    activityType: ActivityTypeEntity

  @OneToMany(
    () => ActivityParameterEntity,
    (activityParameter) => activityParameter.activityTypeParameter,
    { cascade: true },
  )
    activityParameters: ActivityParameterEntity[]
}
