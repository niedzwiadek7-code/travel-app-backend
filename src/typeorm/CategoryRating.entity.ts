/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { Rating } from './Rating.entity'

@Entity()
export class CategoryRating {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    category: string

  @Column({
    nullable: false,
    type: 'int',
  })
    value: number

  @ManyToOne(() => Rating, (rating) => rating.categoryRatings)
    rating: Rating
}
