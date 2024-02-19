import { UserEntity } from './user.entity'
import { TravelRecipeEntity } from './travel-recipe.entity'
import { ElementTravelEntity } from './element-travel.entity'
import { ActivityEntity } from './activity.entity'
import { ElementTravelPhotoEntity } from './element-travel-photo.entity'
import { QuestionEntity } from './question.entity'
import { AnswerEntity } from './answer.entity'
import { RatingEntity } from './rating.entity'
import { PriceEntity } from './price.entity'
import { ActivityTypeEntity } from './activity-type.entity'
import { ActivityTypeParameterEntity } from './activity-type-parameter.entity'
import { ActivityParameterEntity } from './activity-parameter.entity'
import { RoleEntity } from './role.entity'
import { TravelInstanceEntity } from './travel-instance.entity'
import { ElementTravelInstanceEntity } from './element-travel-instance.entity'
import { AccommodationEntity } from './accommodation.entity'
import { AccommodationPriceEntity } from './accommodation-price.entity'
import { AccommodationElementTravelEntity } from './accommodation-element-travel.entity'
import { AccommodationElementTravelInstanceEntity } from './accommodation-element-travel-instance.entity'
import { AccommodationElementTravelPhotoEntity } from './accommodation-element-travel-photo.entity'
import { AccommodationRatingEntity } from './accommodation-rating.entity'

export {
  UserEntity,
  TravelRecipeEntity,
  ElementTravelEntity,
  ActivityEntity,
  QuestionEntity,
  AnswerEntity,
  ActivityTypeEntity,
  ActivityTypeParameterEntity,
  ActivityParameterEntity,
  PriceEntity,
  RoleEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity,
  AccommodationPriceEntity,
  AccommodationEntity,
  AccommodationElementTravelEntity,
  AccommodationElementTravelInstanceEntity,
  AccommodationElementTravelPhotoEntity,
  AccommodationRatingEntity,
  RatingEntity,
}

const entities = [
  UserEntity, TravelRecipeEntity, ElementTravelEntity, ActivityEntity,
  QuestionEntity, AnswerEntity, RatingEntity, ElementTravelPhotoEntity,
  ActivityTypeEntity, ActivityTypeParameterEntity, ActivityParameterEntity, PriceEntity,
  RoleEntity, TravelInstanceEntity, ElementTravelInstanceEntity, AccommodationPriceEntity,
  AccommodationEntity, AccommodationElementTravelEntity, AccommodationElementTravelInstanceEntity,
  AccommodationElementTravelPhotoEntity, AccommodationRatingEntity,
]

export default entities
