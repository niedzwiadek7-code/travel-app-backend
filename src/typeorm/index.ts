import { User } from './User'
import { Travel } from './Travel'
import { Place } from './Place'
import { ElementTravel } from './ElementTravel'
import { Activity } from './Activity'
import { ElementTravelPhoto } from './ElementTravelPhoto'
import { Question } from './Question'
import { Answer } from './Answer'

export {
  User,
  Travel,
  Place,
  ElementTravel,
  Activity,
  Question,
  Answer,
}

const entities = [
  User, Travel, Place, ElementTravel, Activity, ElementTravelPhoto,
  Question, Answer,
]

export default entities
