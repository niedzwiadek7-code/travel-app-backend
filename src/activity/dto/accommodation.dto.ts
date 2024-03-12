import { IsNumber, IsString } from 'class-validator'
import { ActivityDto } from './activity.dto'

export class AccommodationDto extends ActivityDto {
  @IsString()
    place: string

  @IsNumber()
    price: number
}
