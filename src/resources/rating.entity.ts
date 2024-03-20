/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'

@Entity('rating')
export class RatingEntity {
  @Column()
  @PrimaryColumn()
    elementTravelId: number

  @Column({
    nullable: false,
  })
    text: string

  @ManyToOne(
    () => UserEntity,
  )
  @JoinTable()
    author: UserEntity

  @Column()
    authorId: number

  @Column()
    activityId: number

  @ManyToOne(
    () => ActivityEntity,
    (activity) => activity.ratings,
    { onDelete: 'CASCADE' },
  )
    activity: ActivityEntity

  @OneToOne(
    () => ElementTravelInstanceEntity,
    (instance) => instance.rating,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    elementTravel: ElementTravelInstanceEntity

  @Column({
    type: 'boolean',
    default: false,
  })
    sharePhotos: boolean
}
