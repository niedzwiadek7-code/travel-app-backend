import { setSeederFactory } from 'typeorm-extension'
import { PriceEntity } from '../../resources'

export default setSeederFactory(PriceEntity, (faker) => {
  const price = new PriceEntity()
  price.price = faker.number.float({
    min: 10,
    max: 1000,
    multipleOf: 0.01,
  })
  price.startDate = faker.date.past({
    years: 1,
  })
  return price
})
