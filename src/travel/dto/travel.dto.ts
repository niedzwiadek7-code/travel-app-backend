/* eslint-disable max-classes-per-file */

import {
  IsArray, IsInstance, IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator'
import { DateType } from '../../utils'

export class TravelElementGloballyDto {
  @IsNumber()
  @IsNumber()
    from: number

  @IsNumber()
  @IsNumber()
    to: number
}

export class TravelElementLocallyDto {
  @IsNumber()
  @IsNotEmpty()
    dayCount: number

  @IsNotEmpty()
    from: DateType

  @IsNotEmpty()
    to: DateType
}

export class TravelElementDto {
  @IsNumber()
  @IsNotEmpty()
    activityId: number

  @IsOptional()
  @IsNumber()
    price: number

  @IsOptional()
  @IsNumber()
    numberOfPeople: number

  @IsString()
    description: string

  @IsOptional()
  @IsInstance(TravelElementGloballyDto)
    travelElementGlobally?: TravelElementGloballyDto

  @IsOptional()
  @IsInstance(TravelElementLocallyDto)
    travelElementLocally?: TravelElementLocallyDto
}

export class TravelDto {
  @IsString()
  @IsNotEmpty()
    name: string

  @IsNumber()
  @IsNotEmpty()
    countDays: number

  @IsArray()
    travelElements: TravelElementDto[]
}
