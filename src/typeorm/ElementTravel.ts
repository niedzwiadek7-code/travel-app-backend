/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { ElementTravelPhoto } from './ElementTravelPhoto'
import { Travel } from './Travel'
import { Activity } from './Activity'

@Entity()
export class ElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'datetime',
  })
    from: Date

  @Column({
    nullable: false,
    type: 'datetime',
  })
    to: Date

  @OneToMany(() => ElementTravelPhoto, (elementTravelPhoto) => elementTravelPhoto.elementTravel)
    photos: ElementTravelPhoto[]

  @ManyToOne(() => Travel, (travel) => travel.travelElements)
    travel: Travel

  @ManyToOne(() => Activity)
  @JoinTable()
    activity: Activity
}
