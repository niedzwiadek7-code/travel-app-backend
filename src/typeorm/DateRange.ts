import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DateRange {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'datetime',
  })
    from: string

  @Column({
    nullable: false,
    type: 'datetime',
  })
    to: string
}
