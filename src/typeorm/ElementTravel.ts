/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipe } from './TravelRecipe'
import { Activity } from './Activity'

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
