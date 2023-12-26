/* eslint-disable import/no-cycle */

import {
  Column,
  Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhoto } from './ElementTravelPhoto'
import { TravelInstance } from './TravelInstance'
import { Activity } from './Activity'
import { ElementTravel } from './ElementTravel'
import { Rating } from './Rating'

@Entity()
export class ElementTravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: true,
    type: 'boolean',
    default: false,
  })
    passed: boolean

  @OneToMany(() => ElementTravelPhoto, (elementTravelPhoto) => elementTravelPhoto.elementTravel)
    photos: ElementTravelPhoto[]

  @Column('datetime')
    from: Date

  @Column('datetime')
    to: Date

  @Column()
    travelInstanceId: string

  @ManyToOne(
    () => TravelInstance,
    (travelInstance) => travelInstance.travelElements,
    { onDelete: 'CASCADE' },
  )
    travelInstance: TravelInstance

  @Column()
    activityId: string

  @ManyToOne(() => Activity, (activity) => activity.elementTravelInstances)
    activity: Activity

  @Column({
    nullable: true,
  })
    elementTravelId?: string

  @ManyToOne(() => ElementTravel)
    elementTravel?: ElementTravel

  @Column({
    nullable: true,
  })
    ratingId?: string

  @OneToOne(() => Rating, (rating) => rating.elementTravel)
    rating?: Rating
}
