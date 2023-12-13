import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class AddActivityToTravelInstanceDto {
  @IsString()
  @IsNotEmpty()
    activityId: string

  @IsDateString()
  @IsNotEmpty()
    from: string

  @IsDateString()
  @IsNotEmpty()
    to: string
}
