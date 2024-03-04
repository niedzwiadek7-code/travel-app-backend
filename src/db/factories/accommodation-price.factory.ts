import { setSeederFactory } from 'typeorm-extension'
import { AccommodationPriceEntity } from '../../resources'

export default setSeederFactory(AccommodationPriceEntity, (faker) => {
  const accommodationPrice = new AccommodationPriceEntity()
  accommodationPrice.price = faker.number.float({
    min: 10,
    max: 1000,
    multipleOf: 0.01,
  })
  accommodationPrice.startDate = faker.date.past({
    years: 1,
  })
  return accommodationPrice
})
