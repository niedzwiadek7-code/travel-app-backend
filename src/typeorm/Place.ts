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

  @Column({
    nullable: true,
  })
    address: string

  @Column({
    nullable: true,
  })
    zipCode: string

  @Column({
    nullable: false,
  })
    city: string

  @Column({
    nullable: false,
  })
    country: string
}
