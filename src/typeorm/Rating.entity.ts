/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './User.entity'
import { CategoryRatingEntity } from './CategoryRating.entity'
import { ActivityEntity } from './Activity.entity'

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    text: string

  @ManyToOne(() => UserEntity)
  @JoinTable()
    author: Promise<UserEntity>

  @Column()
    authorId: number

  @OneToMany(() => CategoryRatingEntity, (categoryRating) => categoryRating.rating)
    categoryRatings: CategoryRatingEntity[]

  @ManyToOne(() => ActivityEntity, (activity) => activity.ratings)
    activity: ActivityEntity
}
