import 'dotenv/config'
import { PersonServiceMongo } from '@/infra/services/db/mongo'
import { personEntityMock } from '@test/data/mock/entity/person-entity-mock'
import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
import { PersonModel } from '@/infra/services/db/mongo/schema'

describe('# Create person in database', () => {
  beforeAll(async () => {
    await MongoConnection()
  })

  afterEach(async () => {
    await PersonModel.deleteMany()
  })

  afterAll(async () => {
    const connection = await MongoConnection()
    await connection.disconnect()
  })

  test('Success to create a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()
    const result = await personService.create(personEntity)

    if (result.isLeft()) throw Error('Create person in mongo')
    expect(result.value).toStrictEqual(true)
  })

  test('Success to findall a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()

    const created = await personService.create(personEntity)
    if (created.isLeft()) throw Error('Create person in mongo')

    const users = await personService.findAll()

    if (users.isLeft()) throw Error('Findall person in mongo')

    expect(users.value[0]).toMatchObject(personEntity)
  })
})
