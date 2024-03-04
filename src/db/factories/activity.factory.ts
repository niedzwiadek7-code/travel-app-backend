import { setSeederFactory } from 'typeorm-extension'
import { ActivityEntity } from '../../resources'

export default setSeederFactory(ActivityEntity, (faker) => {
  const acitivity = new ActivityEntity()
  acitivity.accepted = faker.datatype.boolean(0.75)
  acitivity.name = faker.lorem.words({
    min: 1,
    max: 5,
  })
  acitivity.description = faker.lorem.paragraphs({
    min: 1,
    max: 3,
  })

  return acitivity
})
