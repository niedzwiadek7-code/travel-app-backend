/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { CategoryRating } from './CategoryRating'
import { Activity } from './Activity'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'text',
  })
    text: string

  @ManyToOne(() => User)
  @JoinTable()
    author: Promise<User>

  @Column()
    authorId: number

  @OneToMany(() => CategoryRating, (categoryRating) => categoryRating.rating)
    categoryRatings: CategoryRating[]

  @ManyToOne(() => Activity, (activity) => activity.ratings)
    activity: Activity
}
