/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, OneToOne, PrimaryColumn,
} from 'typeorm'
import { ElementTravelEntity } from './element-travel.entity'

@Entity('element_travel_locally')
export class ElementTravelLocallyEntity {
  @Column({
    nullable: false,
  })
  @PrimaryColumn()
    elementTravelId: number

  @Column()
    dayCount: number

  @Column('time')
    from: Date

  @Column('time')
    to: Date

  @OneToOne(
    () => ElementTravelEntity,
    (elementTravel) => elementTravel.elementTravelLocally,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    elementTravel: ElementTravelEntity
}
