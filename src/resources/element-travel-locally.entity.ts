/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelEntity } from './element-travel.entity'

@Entity('element_travel_locally')
export class ElementTravelLocallyEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    dayCount: number

  @Column('time')
    from: Date

  @Column('time')
    to: Date

  @Column({
    nullable: false,
  })
    elementTravelId: number

  @OneToOne(
    () => ElementTravelEntity,
    (elementTravel) => elementTravel.elementTravelLocally,
  )
    elementTravel: ElementTravelEntity
}
