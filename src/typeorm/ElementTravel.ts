/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Activity } from './Activity'

@Entity()
export class ElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    dayCount: number

  @Column('time')
    from: Date

  @Column('time')
    to: Date

  @Column({
    nullable: true,
    type: 'float',
  })
    price: number

  @Column({
    nullable: true,
    type: 'int',
  })
    numberOfPeople: number

  @Column({
    nullable: false,
    length: '5000',
  })
    description: string

  @Column()
    travelId: string

  @ManyToOne(() => TravelRecipe, (travel) => travel.travelElements)
    travel: TravelRecipe

  @Column()
    activityId: string

  @ManyToOne(() => Activity)
  @JoinTable()
    activity: Activity
}
