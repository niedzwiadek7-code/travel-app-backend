/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelInstanceEntity } from './ElementTravelInstance.entity'

@Entity()
export class ElementTravelPhotoEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @ManyToOne(() => ElementTravelInstanceEntity, (elementTravel) => elementTravel.photos)
    elementTravel: ElementTravelInstanceEntity
}
