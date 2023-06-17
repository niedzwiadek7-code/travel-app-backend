import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    role: string
}
