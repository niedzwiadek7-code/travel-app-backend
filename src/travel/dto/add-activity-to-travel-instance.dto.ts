import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class AddActivityToTravelInstanceDto {
  @IsString()
  @IsNotEmpty()
    activityId: number

  @IsDateString()
  @IsNotEmpty()
    from: string

  @IsDateString()
  @IsNotEmpty()
    to: string
}
