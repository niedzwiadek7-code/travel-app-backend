/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { AccommodationElementTravelInstanceEntity } from './accommodation-element-travel-instance.entity'

@Entity()
export class AccommodationElementTravelPhotoEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @Column()
    elementTravelId: string

  @ManyToOne(
    () => AccommodationElementTravelInstanceEntity,
    (elementTravel) => elementTravel.photos,
    { onDelete: 'CASCADE' },
  )
    elementTravel: AccommodationElementTravelInstanceEntity
}
