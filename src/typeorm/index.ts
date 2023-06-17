import { UserEntity } from './User.entity'
import { TravelRecipeEntity } from './TravelRecipe.entity'
import { PlaceEntity } from './Place.entity'
import { ElementTravelEntity } from './ElementTravel.entity'
import { ActivityEntity } from './Activity.entity'
import { ElementTravelPhotoEntity } from './ElementTravelPhoto.entity'
import { QuestionEntity } from './Question.entity'
import { AnswerEntity } from './Answer.entity'
import { DateRangeEntity } from './DateRange.entity'
import { TimeRangeEntity } from './TimeRange.entity'
import { RatingEntity } from './Rating.entity'
import { PriceEntity } from './Price.entity'
import { CategoryRatingEntity } from './CategoryRating.entity'
import { ActivityTypeEntity } from './ActivityType.entity'
import { ActivityTypeParameterEntity } from './ActivityTypeParameter.entity'
import { ActivityParameterEntity } from './ActivityParameter.entity'
import { UserRoleEntity } from './UserRole.entity'
import { TravelInstanceEntity } from './TravelInstance.entity'
import { ElementTravelInstanceEntity } from './ElementTravelInstance.entity'

// TODO: entities should be in relative modules

export {
  UserEntity,
  TravelRecipeEntity,
  PlaceEntity,
  ElementTravelEntity,
  ActivityEntity,
  QuestionEntity,
  AnswerEntity,
  DateRangeEntity,
  TimeRangeEntity,
  CategoryRatingEntity,
  ActivityTypeEntity,
  ActivityTypeParameterEntity,
  ActivityParameterEntity,
  PriceEntity,
  UserRoleEntity,
  TravelInstanceEntity,
  ElementTravelInstanceEntity,
}

const entities = [
  UserEntity, TravelRecipeEntity, PlaceEntity, ElementTravelEntity, ActivityEntity, ElementTravelPhotoEntity,
  QuestionEntity, AnswerEntity, DateRangeEntity, TimeRangeEntity, RatingEntity, CategoryRatingEntity,
  ActivityTypeEntity, ActivityTypeParameterEntity, ActivityParameterEntity, PriceEntity,
  UserRoleEntity, TravelInstanceEntity, ElementTravelInstanceEntity,
]

export default entities
