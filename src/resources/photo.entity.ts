/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'

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
}
