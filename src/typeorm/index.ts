import { User } from './User'
import { TravelRecipe } from './TravelRecipe'
import { Place } from './Place'
import { ElementTravel } from './ElementTravel'
import { Activity } from './Activity'
import { ElementTravelPhoto } from './ElementTravelPhoto'
import { Question } from './Question'
import { Answer } from './Answer'
import { DateRange } from './DateRange'
import { TimeRange } from './TimeRange'
import { Rating } from './Rating'
import { Price } from './Price'
import { CategoryRating } from './CategoryRating'
import { ActivityType } from './ActivityType'
import { ActivityTypeParameter } from './ActivityTypeParameter'
import { ActivityParameter } from './ActivityParameter'
import { Role } from './Role'
import { TravelInstance } from './TravelInstance'
import { ElementTravelInstance } from './ElementTravelInstance'
import { Accommodation } from './Accommodation'
import { AccommodationPrice } from './AccommodationPrice'
import { AccommodationElementTravel } from './AccommodationElementTravel'
import { AccommodationElementTravelInstance } from './AccommodationElementTravelInstance'
import { AccommodationElementTravelPhoto } from './AccommodationElementTravelPhoto'

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
  Role,
  TravelInstance,
  ElementTravelInstance,
  AccommodationPrice,
  Accommodation,
  AccommodationElementTravel,
  AccommodationElementTravelInstance,
  AccommodationElementTravelPhoto,
}

const entities = [
  User, TravelRecipe, Place, ElementTravel, Activity, ElementTravelPhoto,
  Question, Answer, DateRange, TimeRange, Rating, CategoryRating,
  ActivityType, ActivityTypeParameter, ActivityParameter, Price,
  Role, TravelInstance, ElementTravelInstance, AccommodationPrice,
  Accommodation, AccommodationElementTravel, AccommodationElementTravelInstance,
  AccommodationElementTravelPhoto,
]

export default entities
