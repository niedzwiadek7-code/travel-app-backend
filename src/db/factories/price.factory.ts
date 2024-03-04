import { setSeederFactory } from 'typeorm-extension'
import { PriceEntity } from '../../resources'

export default setSeederFactory(PriceEntity, (faker) => {
  const price = new PriceEntity()
  price.price = faker.datatype.float({
    min: 10,
    max: 1000,
    precision: 0.01,
  })
  price.startDate = faker.date.past(1)
  return price
})
