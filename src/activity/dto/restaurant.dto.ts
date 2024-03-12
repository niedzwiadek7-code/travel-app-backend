import { IsString } from 'class-validator'
import { ActivityDto } from './activity.dto'

export class RestaurantDto extends ActivityDto {
  @IsString()
    place: string
}
