/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Activity } from './Activity'

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
    startDate: Date

  @Column()
    activityId: string

  @ManyToOne(() => Activity, (activity) => activity.prices)
    activity: Activity
}
