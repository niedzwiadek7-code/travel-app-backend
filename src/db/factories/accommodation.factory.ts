import { setSeederFactory } from 'typeorm-extension'
import { AccommodationEntity } from '../../resources'

export default setSeederFactory(AccommodationEntity, (faker) => {
  const accommodation = new AccommodationEntity()
  accommodation.accepted = faker.datatype.boolean(0.75)
  accommodation.name = faker.lorem.words({
    min: 1,
    max: 5,
  })
  accommodation.place = faker.location.city()
  accommodation.description = faker.lorem.paragraphs({
    min: 1,
    max: 3,
  })

  return accommodation
})
