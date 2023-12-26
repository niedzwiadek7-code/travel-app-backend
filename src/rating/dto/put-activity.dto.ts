import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class PutActivityDto {
  @IsString()
  @IsNotEmpty()
    text: string

  @IsString()
  @IsNotEmpty()
    elementTravelId: string

  @IsBoolean()
  @IsNotEmpty()
    sharePhotos: boolean

  @IsString()
  @IsNotEmpty()
    activityType: string
}
