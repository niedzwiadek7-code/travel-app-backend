import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column()
    longitude: number | null

  @Column()
    latitude: number | null
}
