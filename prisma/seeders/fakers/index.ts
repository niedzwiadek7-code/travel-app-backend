import { PrismaClient } from '@prisma/client'
import Faker from './FakerInterface'
import User from './User'
import Rating from './Rating'
import Question from './Question'
import TravelRecipe from './TravelRecipe'
import TravelInstance from './TravelInstance'

const getFakers = (prismaClient: PrismaClient): Record<string, Faker> => ({
  user: new User(prismaClient),
  rating: new Rating(prismaClient),
  question: new Question(prismaClient),
  travelRecipe: new TravelRecipe(prismaClient),
  travelInstance: new TravelInstance(prismaClient),
})

export default getFakers
