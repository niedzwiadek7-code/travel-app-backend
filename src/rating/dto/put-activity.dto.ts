import {
  IsArray,
  IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min,
} from 'class-validator'

export class PutActivityDto {
  @IsString()
  @IsOptional()
    text: string

  @IsString()
  @IsNotEmpty()
    rating: string

  @IsString()
  @IsNotEmpty()
    elementTravelId: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
    photosToDelete?: string[]

  // @IsArray()
  // @IsOptional()
  //   photosToAdd?: Express.Multer.File[]
  //
  // @IsArray()
  // @IsOptional()
  //   photosToShare?: (Express.Multer.File | number)[]
}
