/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhoto } from './ElementTravelPhoto.entity'
import { DateRange } from './DateRange.entity'
import { TravelInstance } from './TravelInstance.entity'

@Entity()
export class ElementTravelInstance {
  @PrimaryGeneratedColumn()
    id: number

  @OneToMany(() => ElementTravelPhoto, (elementTravelPhoto) => elementTravelPhoto.elementTravel)
    photos: ElementTravelPhoto[]

  @ManyToOne(() => DateRange)
  @JoinTable()
    dateRange: DateRange

  @ManyToOne(() => TravelInstance, (travelInstance) => travelInstance.travelElements)
    travelInstance: TravelInstance
}
