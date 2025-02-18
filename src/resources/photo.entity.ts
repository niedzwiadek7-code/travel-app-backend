/* eslint-disable import/no-cycle */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { RatingEntity } from './rating.entity'

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @ManyToOne(
    () => ElementTravelInstanceEntity,
    (elementTravelInstance) => elementTravelInstance.photos,
    {
      onDelete: 'CASCADE',
      eager: true,
      orphanedRowAction: 'disable',
    },
  )
    elementTravelInstance?: ElementTravelInstanceEntity

  @Column({
    nullable: true,
  })
    elementTravelInstanceId?: number

  @Column({
    type: 'boolean',
    default: false,
  })
    isShared: boolean

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
    deleteAt?: Date
}
