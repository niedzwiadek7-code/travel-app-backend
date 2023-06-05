import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TimeRange {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
    type: 'time',
  })
    from: string

  @Column({
    nullable: false,
    type: 'time',
  })
    to: string
}
