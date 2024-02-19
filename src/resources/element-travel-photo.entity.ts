/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'

@Entity()
export class ElementTravelPhotoEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @Column()
    elementTravelId: string

  @ManyToOne(
    () => ElementTravelInstanceEntity,
    (elementTravel) => elementTravel.photos,
    { onDelete: 'CASCADE' },
  )
    elementTravel: ElementTravelInstanceEntity
}
