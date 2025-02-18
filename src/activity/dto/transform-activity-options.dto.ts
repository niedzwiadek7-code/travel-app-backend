import { IsNumber, IsString } from 'class-validator'

export class TransformActivityOptionsDto {
  @IsString()
    userId: string
}
