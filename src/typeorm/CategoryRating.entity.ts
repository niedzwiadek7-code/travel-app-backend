/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { RatingEntity } from './Rating.entity'

@Entity()
export class CategoryRatingEntity {
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

  @ManyToOne(() => RatingEntity, (rating) => rating.categoryRatings)
    rating: RatingEntity
}
