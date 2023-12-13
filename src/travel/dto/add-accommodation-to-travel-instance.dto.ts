import { IsNotEmpty, IsString } from 'class-validator'

export class AddAccommodationToTravelInstanceDto {
  @IsString()
  @IsNotEmpty()
    accommodationId: string
}
