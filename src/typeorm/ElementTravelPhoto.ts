/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelInstance } from './ElementTravelInstance'

@Entity()
export class ElementTravelPhoto {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @Column()
    elementTravelId: string

  @ManyToOne(() => ElementTravelInstance, (elementTravel) => elementTravel.photos)
    elementTravel: ElementTravelInstance
}
