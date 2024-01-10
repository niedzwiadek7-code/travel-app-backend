/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Activity } from './Activity'
import { ElementTravelInstance } from './ElementTravelInstance'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    text: string

  @ManyToOne(() => User)
  @JoinTable()
    author: User

  @Column()
    authorId: string

  @Column()
    activityId: string

  @ManyToOne(() => Activity, (activity) => activity.ratings)
    activity: Activity

  @Column()
    elementTravelId: string

  @OneToOne(() => ElementTravelInstance, (instance) => instance.rating)
  @JoinColumn()
    elementTravel: ElementTravelInstance

  @Column({
    type: 'boolean',
    default: false,
  })
    sharePhotos: boolean
}
