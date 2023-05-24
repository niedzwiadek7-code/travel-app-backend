import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ElementTravel {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'date',
  })
    from: Date

  @Column({
    nullable: false,
    type: 'date',
  })
    to: Date
}
