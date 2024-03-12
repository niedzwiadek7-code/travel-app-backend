import {
  IsDateString, IsNotEmpty, IsNumber,
} from 'class-validator'

export class PlanATravelDto {
  @IsNumber()
  @IsNotEmpty()
    travelRecipeId: number

  @IsDateString()
  @IsNotEmpty()
    startDate: Date
}
