import { IsArray } from 'class-validator'

export class PassElementDto {
  @IsArray()
    urls: string[]
}
