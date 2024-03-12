import {
  IsNotEmpty, IsString,
} from 'class-validator'

export class ActivityDto {
  @IsNotEmpty()
    name: string

  @IsString()
    description: string
}
