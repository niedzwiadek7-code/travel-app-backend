/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe.entity'
import { Activity } from './Activity.entity'

@Entity()
export class ElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'datetime',
  })
    from: Date

  @Column({
    nullable: false,
    type: 'datetime',
  })
    to: Date

  @ManyToOne(() => TravelRecipe, (travel) => travel.travelElements)
    travel: TravelRecipe

  @ManyToOne(() => Activity)
  @JoinTable()
    activity: Activity
}
