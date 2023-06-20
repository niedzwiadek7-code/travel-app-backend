import { User } from './User.entity'
import { TravelRecipe } from './TravelRecipe.entity'
import { Place } from './Place.entity'
import { ElementTravel } from './ElementTravel.entity'
import { Activity } from './Activity.entity'
import { ElementTravelPhoto } from './ElementTravelPhoto.entity'
import { Question } from './Question.entity'
import { Answer } from './Answer.entity'
import { DateRange } from './DateRange.entity'
import { TimeRange } from './TimeRange.entity'
import { Rating } from './Rating.entity'
import { Price } from './Price.entity'
import { CategoryRating } from './CategoryRating.entity'
import { ActivityType } from './ActivityType.entity'
import { ActivityTypeParameter } from './ActivityTypeParameter.entity'
import { ActivityParameter } from './ActivityParameter.entity'
import { UserRole } from './UserRole.entity'
import { TravelInstance } from './TravelInstance.entity'
import { ElementTravelInstance } from './ElementTravelInstance.entity'

export {
  User,
  TravelRecipe,
  Place,
  ElementTravel,
  Activity,
  Question,
  Answer,
  DateRange,
  TimeRange,
  CategoryRating,
  ActivityType,
  ActivityTypeParameter,
  ActivityParameter,
  Price,
  UserRole,
  TravelInstance,
  ElementTravelInstance,
}

const entities = [
  User, TravelRecipe, Place, ElementTravel, Activity,
  ElementTravelPhoto, Question, Answer, DateRange, TimeRange,
  Rating, CategoryRating, ActivityType, ActivityTypeParameter,
  ActivityParameter, Price, UserRole, TravelInstance,
  ElementTravelInstance,
]

export default entities
