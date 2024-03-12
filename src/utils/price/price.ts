import { DateHandler, DateType } from '../date'
import { PriceType } from './types'

export const getActualPrice = (results: PriceType[], date?: DateType): number => {
  const actualPriceResults = results
    .filter((priceObj) => DateHandler.compareDates(date || new Date(), priceObj.startDate) >= 0)

  if (actualPriceResults.length === 0) {
    return undefined
  }

  const actualPriceObj = actualPriceResults
    .sort((a, b) => -DateHandler.compareDates(a.startDate, b.startDate))[0]

  return actualPriceObj.price
}
