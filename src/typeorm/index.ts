import { User } from './User'
import { TravelRecipe } from './TravelRecipe'
import { Place } from './Place'
import { ElementTravel } from './ElementTravel'
import { Activity } from './Activity'
import { ElementTravelPhoto } from './ElementTravelPhoto'
import { Question } from './Question'
import { Answer } from './Answer'
import { Rating } from './Rating'
import { Price } from './Price'
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
import { AccommodationRating } from './AccommodationRating'

export {
  User,
  TravelRecipe,
  Place,
  ElementTravel,
  Activity,
  Question,
  Answer,
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
  AccommodationRating,
  Rating,
}

const entities = [
  User, TravelRecipe, Place, ElementTravel, Activity, ElementTravelPhoto,
  Question, Answer, Rating,
  ActivityType, ActivityTypeParameter, ActivityParameter, Price,
  Role, TravelInstance, ElementTravelInstance, AccommodationPrice,
  Accommodation, AccommodationElementTravel, AccommodationElementTravelInstance,
  AccommodationElementTravelPhoto, AccommodationRating,
]

export default entities
