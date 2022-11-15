import { PersonServiceMongo } from '@/infra/services/db/mongo'
import { personEntityMock } from '@test/data/mock/entity/person-entity-mock'
import { describe, test, expect } from 'vitest'

describe('# Create person in database', () => {
  test('Success to create a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()
    const result = await personService.create(personEntity)

    if (result.isLeft()) throw Error('Create person in mongo')
    expect(result.value).toStrictEqual(true)
  })
})
