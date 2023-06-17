/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './TravelRecipe.entity'
import { ActivityEntity } from './Activity.entity'

@Entity()
export class ElementTravelEntity {
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

  @ManyToOne(() => TravelRecipeEntity, (travel) => travel.travelElements)
    travel: TravelRecipeEntity

  @ManyToOne(() => ActivityEntity)
  @JoinTable()
    activity: ActivityEntity
}
