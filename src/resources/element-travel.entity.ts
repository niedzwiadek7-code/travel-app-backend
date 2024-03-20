/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelGloballyEntity } from './element-travel-globally.entity'
import { ElementTravelLocallyEntity } from './element-travel-locally.entity'

@Entity('element_travel')
export class ElementTravelEntity {
  @PrimaryGeneratedColumn()
    id: number

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
    travelId: number

  @ManyToOne(
    () => TravelRecipeEntity,
    (travel) => travel.travelElements,
    {
      onDelete: 'CASCADE',
      eager: true,
      orphanedRowAction: 'disable',
    },
  )
    travel: TravelRecipeEntity

  @Column()
    activityId: number

  @ManyToOne(
    () => ActivityEntity,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
    activity: ActivityEntity

  @OneToOne(
    () => ElementTravelLocallyEntity,
    (elementTravelLocally) => elementTravelLocally.elementTravel,
    { cascade: true, onDelete: 'SET NULL' },
  )
    elementTravelLocally?: ElementTravelLocallyEntity

  @OneToOne(
    () => ElementTravelGloballyEntity,
    (elementTravelGlobally) => elementTravelGlobally.elementTravel,
    { cascade: true, onDelete: 'SET NULL' },
  )
    elementTravelGlobally?: ElementTravelGloballyEntity
}
