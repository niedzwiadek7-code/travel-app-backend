import {
  IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator'

export class ActivityDto {
  @IsNotEmpty()
  @IsString()
    activityType: string

  @IsString()
  @IsNotEmpty()
    name: string

  @IsOptional()
  @IsString()
    description: string

  @IsOptional()
  @IsString()
    place: string

  @IsOptional()
  @IsString()
    from: string

  @IsOptional()
  @IsString()
    to: string

  @IsOptional()
  @IsNumber()
    price: number

  @IsOptional()
  @IsString()
    priceType: string
}
