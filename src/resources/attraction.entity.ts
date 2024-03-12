/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, OneToOne, PrimaryColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'

@Entity('attraction')
export class AttractionEntity {
  @Column({
    nullable: false,
  })
  @PrimaryColumn()
    activityId: number

  @Column({
    nullable: false,
  })
    place: string

  @Column({
    nullable: false,
    enum: ['per_hour', 'per_entry'],
  })
    priceType: 'per_hour' | 'per_entry'

  @OneToOne(
    () => ActivityEntity,
    (activity) => activity.attraction,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    activity: ActivityEntity
}
