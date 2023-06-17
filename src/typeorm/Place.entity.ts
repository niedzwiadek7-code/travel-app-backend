import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PlaceEntity {
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
    nullable: false,
  })
    address: string

  @Column({
    nullable: false,
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
