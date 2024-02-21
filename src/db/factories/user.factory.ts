import { setSeederFactory } from 'typeorm-extension'
import { UserEntity } from '../../resources'

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity()

  user.firstName = faker.person.firstName()
  user.lastName = faker.person.lastName()
  user.email = faker.internet.email()
  user.password = faker.internet.password()

  return user
})
