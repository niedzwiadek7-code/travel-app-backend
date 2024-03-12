/* eslint-disable import/no-cycle */

import { UserEntity } from './user.entity'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { ActivityEntity } from './activity.entity'
import { PhotoEntity } from './photo.entity'
import { QuestionEntity } from './question.entity'
import { AnswerEntity } from './answer.entity'
import { RatingEntity } from './rating.entity'
import { PriceEntity } from './price.entity'
import { RoleEntity } from './role.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { AccommodationEntity } from './accommodation.entity'
import { TripEntity } from './trip.entity'
import { RestaurantEntity } from './restaurant.entity'
import { AttractionEntity } from './attraction.entity'
import { ElementTravelLocallyEntity } from './element-travel-locally.entity'
import { ElementTravelGloballyEntity } from './element-travel-globally.entity'

export {
  UserEntity,
  TravelRecipeEntity,
  ElementTravelEntity,
  ActivityEntity,
  QuestionEntity,
  AnswerEntity,
  PriceEntity,
  RoleEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity,
  AccommodationEntity,
  TripEntity,
  RatingEntity,
  RestaurantEntity,
  AttractionEntity,
  PhotoEntity,
  ElementTravelLocallyEntity,
  ElementTravelGloballyEntity,
}

const entities = [
  UserEntity, TravelRecipeEntity, ElementTravelEntity, ActivityEntity,
  QuestionEntity, AnswerEntity, RatingEntity, PhotoEntity, PriceEntity,
  RoleEntity, TravelInstanceEntity, ElementTravelInstanceEntity, TripEntity,
  AccommodationEntity, RestaurantEntity, AttractionEntity, ElementTravelLocallyEntity,
  ElementTravelGloballyEntity,
]

export default entities
