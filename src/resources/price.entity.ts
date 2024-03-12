/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './activity.entity'

@Entity('price')
export class PriceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'float',
  })
    price: number

  @Column({
    nullable: true,
    type: 'date',
    default: new Date(),
  })
    startDate: Date

  @Column()
    activityId: number

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.prices,
    {
      onDelete: 'CASCADE',
      eager: true,
      orphanedRowAction: 'disable',
    },
  )
    activity: ActivityEntity
}
