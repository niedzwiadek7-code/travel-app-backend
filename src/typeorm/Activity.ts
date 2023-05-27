/* eslint-disable import/no-cycle */

import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { Question } from './Question'

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column({
    nullable: false,
    type: 'float',
  })
    price: number

  @Column({
    nullable: false,
  })
    description: string

  @OneToMany(() => Question, (question) => question.activity)
    questions: Question[]
}
