/* eslint-disable import/no-cycle */

import {
  Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Place } from './Place'

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => User, (user) => user.travels)
    user: User

  @ManyToOne(() => Place)
  @JoinTable()
    place: Place
}
