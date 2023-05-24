import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
