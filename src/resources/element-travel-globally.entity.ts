/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelEntity } from './element-travel.entity'

@Entity('element_travel_globally')
export class ElementTravelGloballyEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    from: number

  @Column()
    to: number

  @Column({
    nullable: false,
  })
    elementTravelId: number

  @OneToOne(
    () => ElementTravelEntity,
    (elementTravel) => elementTravel.elementTravelGlobally,
  )
    elementTravel: ElementTravelEntity
}
