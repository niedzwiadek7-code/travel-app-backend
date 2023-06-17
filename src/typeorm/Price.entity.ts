/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ActivityEntity } from './Activity.entity'

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
    startDate: number

  @ManyToOne(() => ActivityEntity, (activity) => activity.prices)
    activity: ActivityEntity
}
