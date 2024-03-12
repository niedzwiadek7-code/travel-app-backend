import { IsNumber, IsString } from 'class-validator'
import { ActivityDto } from './activity.dto'

export class TripDto extends ActivityDto {
  @IsString()
    from: string

  @IsString()
    to: string

  @IsNumber()
    price: number
}
