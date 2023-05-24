/* eslint-disable import/no-cycle */

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravel } from './ElementTravel'

@Entity()
export class ElementTravelPhoto {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    url: string

  @ManyToOne(() => ElementTravel, (elementTravel) => elementTravel.photos)
    elementTravel: ElementTravel
}
