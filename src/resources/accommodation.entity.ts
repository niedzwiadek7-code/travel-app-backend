/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, OneToOne, PrimaryColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'

@Entity('accommodation')
export class AccommodationEntity {
  @Column({
    nullable: false,
  })
  @PrimaryColumn()
    activityId: number

  @Column({
    nullable: false,
  })
    place: string

  @OneToOne(
    () => ActivityEntity,
    (activity) => activity.accommodation,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    activity: ActivityEntity
}
