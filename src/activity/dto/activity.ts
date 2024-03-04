import { UserEntity } from '../../resources'

interface Rating {
  author: UserEntity,
  text: string,
  photos: Array<string>,
}

export interface ActivityFormat {
  id: number,
  accepted: boolean,
  name: string,
  description: string,
  activityType: string,
  ratings: Array<Rating>,
  price: number,
}
