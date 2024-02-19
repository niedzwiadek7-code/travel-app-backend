/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
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

  @ManyToOne(() => ActivityTypeEntity, (activityType) => activityType.activityTypeParameters)
    activityType: ActivityTypeEntity

  @OneToMany(
    () => ActivityParameterEntity,
    (activityParameter) => activityParameter.activityTypeParameter,
  )
    activityParameters: ActivityParameterEntity[]
}
