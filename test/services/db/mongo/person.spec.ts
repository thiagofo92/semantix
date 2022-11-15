import 'dotenv/config'
import { PersonServiceMongo } from '@/infra/services/db/mongo'
import { personEntityMock } from '@test/data/mock/entity/person-entity-mock'
import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
import { PersonModel } from '@/infra/services/db/mongo/schema'
import { left } from '@/shared/error/Either'
import { PersonCreateError, PersonFindAllError } from '@/app/errors'

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

  test('Faitl to create a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()
    vi.spyOn(personService, 'create').mockResolvedValueOnce(left(new PersonCreateError('Test create fail fake')))
    const result = await personService.create(personEntity)

    expect(result.value).instanceOf(PersonCreateError)
  })

  test('Fail get all person from Mongo', async () => {
    const personService = new PersonServiceMongo()
    vi.spyOn(personService, 'findAll').mockResolvedValueOnce(left(new PersonFindAllError('Test findall fail fake')))
    const result = await personService.findAll()

    expect(result.value).toStrictEqual(PersonFindAllError)
  })
})
