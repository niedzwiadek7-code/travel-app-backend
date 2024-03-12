import { getActualPrice } from './price'
import { PriceType } from './types'

describe('Price Util', () => {
  it('should compare prices', () => {
    const prices: PriceType[] = [
      {
        startDate: '2020-01-03',
        price: 200,
      },
      {
        startDate: '2020-03-04',
        price: 300,
      },
      {
        startDate: '2021-01-01',
        price: 100,
      },
    ]

    expect(getActualPrice([])).toBe(undefined)
    expect(getActualPrice(prices, '2020-03-04')).toBe(300)
    expect(getActualPrice(prices, '2020-01-03')).toBe(200)
    expect(getActualPrice(prices, '2021-01-01')).toBe(100)

    expect(getActualPrice(prices)).toBe(100)
  })
})
