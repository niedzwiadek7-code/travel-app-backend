/* eslint-disable import/no-cycle */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { PhotoEntity } from './photo.entity'

@Entity('rating')
export class RatingEntity {
  @Column()
  @PrimaryColumn()
    elementTravelId: number

  @Column({
    nullable: false,
    type: 'int',
  })
    rating: number

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

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
    createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
    updatedAt: Date

  @DeleteDateColumn()
    deletedAt?: Date
}
