/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'

@Entity()
export class PriceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'float',
  })
    price: number

  @Column({
    nullable: false,
    type: 'date',
  })
    startDate: Date

  @Column()
    activityId: string

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.prices,
    { onDelete: 'CASCADE' },
  )
    activity: ActivityEntity
}
