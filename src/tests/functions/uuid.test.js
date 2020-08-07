import randomString from 'random-string'
import {
  uuid
} from '../../utils/uuid'
import {
  models
} from '../../models'

afterAll( () => models.sequelize.close() )

test('Print ordered UUID 3-4-1-4-5', () => {
  const orderedUuid = uuid();

  expect(orderedUuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

test('To generate User, uuid generation should on operation', async () => {
  const user = await models.User.create({
    email: `${randomString()}@test.com`,
    password: randomString()
  })

  expect(user.uuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})
