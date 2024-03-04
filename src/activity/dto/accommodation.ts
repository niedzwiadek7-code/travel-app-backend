import { UserEntity } from '../../resources'

interface Rating {
  author: UserEntity,
  text: string,
  photos: Array<string>,
}

export interface AccommodationFormat {
  id: number
  name: string
  place: string
  description: string
  price: number
  ratings: Array<Rating>,
}
