import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { PersonService } from '@/infra/services/db/memory'
import { PersonUseCase } from '@/app/use-case'
import { PersonCreateError } from '@/core/errors/person-error'
import { left } from '@/shared/error/Either'
import { PersonModel } from '../models/person-model'

interface Factory {
  sut: PersonUseCase
  personServiceMock: PersonService
  personFake: PersonModel
}

function factoryPerson (): Factory {
  const personFake: PersonModel = {
    id: faker.datatype.number({ min: 1, max: 1 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    contact: [{
      id: faker.datatype.number({ min: 1, max: 10 }),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      phoneNumber: faker.phone.number(),
      userId: faker.datatype.number({ min: 1, max: 1 })
    }],
    address: [{
      id: faker.datatype.number({ min: 1, max: 10 }),
      userId: faker.datatype.number({ min: 1, max: 1 }),
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipcode: faker.address.zipCode(),
      country: faker.address.country(),
      number: faker.address.buildingNumber(),
      countryCode: faker.address.countryCode()
    }],
    createdAt: ''
  }

  const personServiceMock = new PersonService()
  const sut = new PersonUseCase(personServiceMock)

  return {
    sut,
    personServiceMock,
    personFake
  }
}

describe('# Use case to create the user in Mango DB', () => {
  test('Create user in DB', async () => {
    const { sut, personFake } = factoryPerson()

    const result = await sut.create(personFake)

    expect(result).toStrictEqual(true)
  })

  test('Error when try to save data in DB', async () => {
    const { sut, personFake, personServiceMock } = factoryPerson()
    vi.spyOn(personServiceMock, 'create').mockResolvedValueOnce(left(new PersonCreateError('Test')))
    const result = await sut.create(personFake)

    expect(result).toStrictEqual(false)
  })
})
