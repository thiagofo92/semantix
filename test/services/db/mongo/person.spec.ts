import 'dotenv/config'
import { PersonServiceMongo } from '@/infra/services/db/mongo'
import { personEntityMock } from '@test/data/mock/entity/person-entity-mock'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'

describe('# Create person in database', () => {
  beforeAll(async () => {
    await MongoConnection()
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
})
