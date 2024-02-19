/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhotoEntity } from './element-travel-photo.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { RatingEntity } from './rating.entity'

@Entity()
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
    () => ElementTravelPhotoEntity,
    (elementTravelPhoto) => elementTravelPhoto.elementTravel,
  )
    photos: ElementTravelPhotoEntity[]

  @Column({ type: 'timestamp' })
    from: Date

  @Column({ type: 'timestamp' })
    to: Date

  @Column()
    travelInstanceId: string

  @ManyToOne(
    () => TravelInstanceEntity,
    (travelInstance) => travelInstance.travelElements,
    { onDelete: 'CASCADE' },
  )
    travelInstance: TravelInstanceEntity

  @Column()
    activityId: string

  @ManyToOne(() => ActivityEntity, (activity) => activity.elementTravelInstances)
    activity: ActivityEntity

  @Column({
    nullable: true,
  })
    elementTravelId?: string

  @ManyToOne(() => ElementTravelEntity)
    elementTravel?: ElementTravelEntity

  @Column({
    nullable: true,
  })
    ratingId?: string

  @OneToOne(() => RatingEntity, (rating) => rating.elementTravel)
    rating?: RatingEntity
}
