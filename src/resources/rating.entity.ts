/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
    id: number

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

  @Column()
    elementTravelId: number

  @OneToOne(
    () => ElementTravelInstanceEntity,
    (instance) => instance.rating,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
    elementTravel: ElementTravelInstanceEntity

  @Column({
    type: 'boolean',
    default: false,
  })
    sharePhotos: boolean
}
