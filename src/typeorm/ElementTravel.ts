/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhoto } from './ElementTravelPhoto'

@Entity()
export class ElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'date',
  })
    from: Date

  @Column({
    nullable: false,
    type: 'date',
  })
    to: Date

  @OneToMany(() => ElementTravelPhoto, (elementTravelPhoto) => elementTravelPhoto.elementTravel)
    photos: ElementTravelPhoto[]
}
