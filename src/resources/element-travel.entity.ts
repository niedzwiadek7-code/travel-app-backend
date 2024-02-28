/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ActivityEntity } from './activity.entity'

@Entity()
export class ElementTravelEntity {
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

  @ManyToOne(
    () => TravelRecipeEntity,
    (travel) => travel.travelElements,
    { onDelete: 'CASCADE' },
  )
    travel: TravelRecipeEntity

  @Column()
    activityId: string

  @ManyToOne(
    () => ActivityEntity,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
    activity: ActivityEntity
}
