import {
  IsDateString, IsNotEmpty, IsString,
} from 'class-validator'

export class PlanATravelDto {
  @IsString()
  @IsNotEmpty()
    travelRecipeId: string

  @IsDateString()
  @IsNotEmpty()
    startDate: Date
}
