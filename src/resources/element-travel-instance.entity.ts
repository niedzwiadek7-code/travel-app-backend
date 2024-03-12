/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { PhotoEntity } from './photo.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { RatingEntity } from './rating.entity'

@Entity('element_travel_instance')
export class ElementTravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
  })
    passed: boolean

  @OneToMany(
    () => PhotoEntity,
    (photo) => photo.elementTravelInstance,
    { cascade: true },
  )
    photos: PhotoEntity[]

  @Column({ type: 'timestamp' })
    from: string

  @Column({ type: 'timestamp' })
    to: string

  @Column()
    travelInstanceId: string

  @ManyToOne(
    () => TravelInstanceEntity,
    (travelInstance) => travelInstance.travelElements,
    { cascade: true, onDelete: 'CASCADE' },
  )
    travelInstance: TravelInstanceEntity

  @Column()
    activityId: number

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.elementTravelInstances,
    { onDelete: 'CASCADE' },
  )
    activity: ActivityEntity

  @Column({
    nullable: true,
  })
    elementTravelId?: number

  @ManyToOne(
    () => ElementTravelEntity,
    { onDelete: 'CASCADE' },
  )
    elementTravel?: ElementTravelEntity

  @Column({
    nullable: true,
  })
    ratingId?: string

  @OneToOne(() => RatingEntity, (rating) => rating.elementTravel)
    rating?: RatingEntity
}
