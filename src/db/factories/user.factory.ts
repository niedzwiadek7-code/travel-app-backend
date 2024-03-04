import { setSeederFactory } from 'typeorm-extension'
import * as argon from 'argon2'
import { UserEntity } from '../../resources'

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity()

  const hashPassword = (password: string): Promise<string> => argon.hash(password)

  user.firstName = faker.person.firstName()
  user.lastName = faker.person.lastName()
  user.email = faker.internet.email()
  user.password = await hashPassword(faker.internet.password())

  return user
})
