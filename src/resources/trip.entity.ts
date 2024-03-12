/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, OneToOne, PrimaryColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'

@Entity('trip')
export class TripEntity {
  @Column({
    nullable: false,
  })
  @PrimaryColumn()
    activityId: number

  @Column({
    nullable: false,
  })
    from: string

  @Column({
    nullable: false,
  })
    to: string

  @OneToOne(
    () => ActivityEntity,
    (activity) => activity.trip,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    activity: ActivityEntity
}
