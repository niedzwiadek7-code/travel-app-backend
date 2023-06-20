/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Activity } from './Activity.entity'

@Entity()
export class Price {
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

  @ManyToOne(() => Activity, (activity) => activity.prices)
    activity: Activity
}
