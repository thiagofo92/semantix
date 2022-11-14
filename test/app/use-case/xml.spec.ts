import 'dotenv/config'
import { userFirstIdMock } from '@test/data/mock/person/user-first-id-mock'
import { RequesHttpstFake } from '@test/services/mock/RequestHttpsFake'
import { describe, test, expect } from 'vitest'

describe('# XML UseCase', () => {
  test('Success to get users, address, contact', async () => {
    const requestHttps = new RequesHttpstFake()
    const xmlUseCase = new XmlUseCase(requestHttps)
    const expectedUser = userFirstIdMock()

    const result = await xmlUseCase.execute()

    expect(result).toMatchObject(expectedUser)
  })
})
