import 'dotenv/config'
import { userAddressFirstIdMock, userContactFirstIdMock, userFirstIdMock } from '@test/data/mock/person/user-first-id-mock'
import { RequesHttpstFake } from '@test/services/mock/RequestHttpsFake'
import { describe, test, expect } from 'vitest'
import { XmlUseCase } from '@/app/use-case/xml-use-case'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { Users } from '@/core/contract/xml-contract'
import { RequestHttps } from '@/infra/services/http/request-https'

describe('# XML UseCase', () => {
  test('Success to get users', async () => {
    const requestHttps = new RequestHttps()
    const xmlToJsonService = new XmlToJsonService()

    const user = process.env.API_TECH_USER || ''
    const password = process.env.API_TECH_PASSWORD || ''

    const xmlUseCase = new XmlUseCase(requestHttps, xmlToJsonService, user, password)
    const expectedUser = userFirstIdMock()
    const url = `${process.env.API_TECH_BASEURL || ''}/users`
    const usersParams: Users = {
      url,
      pagination: '1',
      limit: '1'
    }

    const users = await xmlUseCase.getUsers(usersParams)
  })

  test('Success to get address from user id 1', async () => {
    const requestHttps = new RequestHttps()
    const xmlToJsonService = new XmlToJsonService()

    const user = process.env.API_TECH_USER || ''
    const password = process.env.API_TECH_PASSWORD || ''

    const xmlUseCase = new XmlUseCase(requestHttps, xmlToJsonService, user, password)
    const expectedUser = userAddressFirstIdMock()
    const url = `${process.env.API_TECH_BASEURL || ''}/users`
    const usersParams: Users = {
      url,
      pagination: '1',
      limit: '1'
    }

    // const users = await xmlUseCase.getUsers(usersParams)
    const userAddress = await xmlUseCase.getAddress(`${url}/1/address`)
  })

  test('Success to get contact from user id 1', async () => {
    const requestHttps = new RequestHttps()
    const xmlToJsonService = new XmlToJsonService()

    const user = process.env.API_TECH_USER || ''
    const password = process.env.API_TECH_PASSWORD || ''

    const xmlUseCase = new XmlUseCase(requestHttps, xmlToJsonService, user, password)
    const expectedUser = userContactFirstIdMock()
    const url = `${process.env.API_TECH_BASEURL || ''}/users`

    // const users = await xmlUseCase.getUsers(usersParams)
    const userContact = await xmlUseCase.getContact(`${url}/1/contacts`)
    console.log(userContact)
  })
})
