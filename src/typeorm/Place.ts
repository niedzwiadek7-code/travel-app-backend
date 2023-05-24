import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    nullable: false,
  })
    name: string

  @Column({
    nullable: true,
  })
    longitude: string | null

  @Column({
    nullable: true,
  })
    latitude: string | null
}
