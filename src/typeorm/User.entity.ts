/* eslint-disable import/no-cycle */

import {
  Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm'
import { TravelRecipeEntity } from './TravelRecipe.entity'
import { QuestionEntity } from './Question.entity'
import { UserRoleEntity } from './UserRole.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    firstName: string

  @Column({
    nullable: false,
  })
    lastName: string

  @Column({
    nullable: false,
  })
    email: string

  @Column({
    nullable: false,
  })
    password: string

  @ManyToOne(() => UserRoleEntity)
  @JoinTable()
    role: UserRoleEntity

  @OneToMany(() => TravelRecipeEntity, (travel) => travel.user)
    travels: TravelRecipeEntity[]

  @OneToMany(() => QuestionEntity, (question) => question.author)
    questions: QuestionEntity[]
}
