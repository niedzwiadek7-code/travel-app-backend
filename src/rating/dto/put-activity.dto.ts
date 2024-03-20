import {
  IsBoolean, IsNotEmpty, IsNumber, IsString,
} from 'class-validator'

export class PutActivityDto {
  @IsString()
  @IsNotEmpty()
    text: string

  @IsNumber()
  @IsNotEmpty()
    elementTravelId: number

  @IsBoolean()
  @IsNotEmpty()
    sharePhotos: boolean
}
