import { IsEnum, IsNumber, IsString } from 'class-validator'
import { ActivityDto } from './activity.dto'

export class AttractionDto extends ActivityDto {
  @IsString()
    place: string

  @IsString()
  @IsEnum(['per_entry', 'per_hour'])
    priceType: 'per_entry' | 'per_hour'

  @IsNumber()
    price: number
}
