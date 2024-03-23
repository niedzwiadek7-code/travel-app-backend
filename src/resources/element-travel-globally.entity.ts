/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinColumn, OneToOne, PrimaryColumn,
} from 'typeorm'
import { ElementTravelEntity } from './element-travel.entity'

@Entity('element_travel_globally')
export class ElementTravelGloballyEntity {
  @Column({
    nullable: false,
  })
  @PrimaryColumn()
    elementTravelId: number

  @Column()
    from: number

  @Column()
    to: number

  @OneToOne(
    () => ElementTravelEntity,
    (elementTravel) => elementTravel.elementTravelGlobally,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
    elementTravel: ElementTravelEntity
}
