import { describe, vi, expect, test } from 'vitest'
import { PersonService } from '@test/services/mock/db/memory'
import { PersonUseCase } from '@/app/use-case'
import { PersonCreateError } from '@/app/errors/person-error'
import { left } from '@/shared/error/Either'
import { PersonWithAddressAndContactModel } from '@/app/models/person-model'
import { userFirstIdWithAddressAndContactMock } from '@test/data/mock/model'

interface Factory {
  sut: PersonUseCase
  personServiceMock: PersonService
  personFake: PersonWithAddressAndContactModel
}

function factoryPerson (): Factory {
  const personFake: PersonWithAddressAndContactModel = userFirstIdWithAddressAndContactMock()

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

    const result = await sut.createOne(personFake)

    expect(result).toStrictEqual(true)
  })

  test('Create many users in DB', async () => {
    const { sut, personFake } = factoryPerson()

    const result = await sut.createMany([personFake])
    const users = await sut.findAll()

    expect(result).toStrictEqual(true)
    expect(users.length).toBeGreaterThan(0)
  })

  test('Error when try to save data in DB', async () => {
    const { sut, personFake, personServiceMock } = factoryPerson()
    vi.spyOn(personServiceMock, 'createMany').mockResolvedValueOnce(left(new PersonCreateError('Test create many')))
    const result = await sut.createMany([personFake])

    expect(result).toStrictEqual(false)
  })

  test('Error when try to save data in DB', async () => {
    const { sut, personFake, personServiceMock } = factoryPerson()
    vi.spyOn(personServiceMock, 'createOne').mockResolvedValueOnce(left(new PersonCreateError('Test create one')))
    const result = await sut.createOne(personFake)

    expect(result).toStrictEqual(false)
  })
})
