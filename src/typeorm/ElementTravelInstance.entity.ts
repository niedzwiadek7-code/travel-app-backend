/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhotoEntity } from './ElementTravelPhoto.entity'
import { DateRangeEntity } from './DateRange.entity'
import { TravelInstanceEntity } from './TravelInstance.entity'

@Entity()
export class ElementTravelInstanceEntity {
  @PrimaryGeneratedColumn()
    id: number

  @OneToMany(() => ElementTravelPhotoEntity, (elementTravelPhoto) => elementTravelPhoto.elementTravel)
    photos: ElementTravelPhotoEntity[]

  @ManyToOne(() => DateRangeEntity)
  @JoinTable()
    dateRange: DateRangeEntity

  @ManyToOne(() => TravelInstanceEntity, (travelInstance) => travelInstance.travelElements)
    travelInstance: TravelInstanceEntity
}
