import 'dotenv/config'
import { PersonServiceMongo } from '@/infra/services/db/mongo'
import { personEntityArrayMock, personEntityMock } from '@test/data/mock/entity/person-entity-mock'
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
    const result = await personService.createOne(personEntity)

    if (result.isLeft()) throw Error('Create person in mongo')
    expect(result.value).toStrictEqual(true)
  })

  test('Success to create many a person entity in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityArrayMock()
    const result = await personService.createMany(personEntity)
    const users = await personService.findAll()

    if (result.isLeft()) throw Error('Create person in mongo')
    expect(result.value).toStrictEqual(true)
    expect(users.value).toMatchObject(personEntity)
  })

  test('Success to findall a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()

    const created = await personService.createOne(personEntity)
    if (created.isLeft()) throw Error('Create person in mongo')

    const users = await personService.findAll()

    if (users.isLeft()) throw Error('Findall person in mongo')

    expect(users.value[0]).toMatchObject(personEntity)
  })

  test('Faitl to create a person in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityMock()
    vi.spyOn(personService, 'createOne').mockResolvedValueOnce(left(new PersonCreateError('Test create fail fake')))
    const result = await personService.createOne(personEntity)

    expect(result.value).instanceOf(PersonCreateError)
  })

  test('Faitl to create many person entity in Mongo', async () => {
    const personService = new PersonServiceMongo()
    const personEntity = personEntityArrayMock()
    vi.spyOn(personService, 'createMany').mockResolvedValueOnce(left(new PersonCreateError('Test create many fail fake')))
    const result = await personService.createMany(personEntity)

    expect(result.value).instanceOf(PersonCreateError)
  })

  test('Fail get all person entity from Mongo', async () => {
    const personService = new PersonServiceMongo()
    vi.spyOn(personService, 'findAll').mockResolvedValueOnce(left(new PersonFindAllError('Test findall fail fake')))
    const result = await personService.findAll()

    expect(result.value).instanceOf(PersonFindAllError)
  })
})
