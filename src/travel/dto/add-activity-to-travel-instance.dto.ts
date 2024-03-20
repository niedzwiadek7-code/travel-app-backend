import {
  IsDateString, IsNotEmpty, IsNumber,
} from 'class-validator'

export class AddActivityToTravelInstanceDto {
  @IsNumber()
  @IsNotEmpty()
    activityId: number

  @IsDateString()
  @IsNotEmpty()
    from: string

  @IsDateString()
  @IsNotEmpty()
    to: string
}
