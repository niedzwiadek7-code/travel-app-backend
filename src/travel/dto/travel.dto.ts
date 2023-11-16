/* eslint-disable max-classes-per-file */

import {
  IsArray,
  IsInstance, IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator'

class DateDto {
  @IsNumber()
  @IsNotEmpty()
    hour: number

  @IsNumber()
  @IsNotEmpty()
    minute: number
}

export class TravelElementDto {
  @IsNumber()
  @IsNotEmpty()
    dayCount: number

  @IsInstance(DateDto)
    from: DateDto

  @IsInstance(DateDto)
    to: DateDto

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
}

class AccommodationElementTravelDto {
  @IsNumber()
  @IsNotEmpty()
    accommodationId: string

  @IsNumber()
  @IsNotEmpty()
    numberOfDays: number

  @IsNotEmpty()
  @IsNumber()
    price: number

  @IsString()
    description: string
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

  @IsArray()
    accommodations: AccommodationElementTravelDto[]
}
