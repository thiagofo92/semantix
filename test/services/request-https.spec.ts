import 'dotenv/config'
import { describe, test, expect } from 'vitest'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { RequestHttps } from '@/infra/services/http/request-https'
import { RequestHttpsGetError } from '@/core/errors'

describe('# Request HTTPS - API linkapi-desafio-tech', () => {
  test('Succes to request users', async () => {
    const requestHttps = new RequestHttps()
    const baseUrl = process.env.API_TECH_BASEURL || ''
    const user = process.env.API_TECH_USER || ''
    const password = process.env.API_TECH_PASSOWRD || ''

    const authorization = Buffer.from(`${user}:${password}`).toString('base64')
    const options = {
      headers: {
        Authorization: `Basic ${authorization}`
      }
    }

    const result = await requestHttps.get<string>(`${baseUrl}/users/1/address`, options)

    if (result.isLeft()) {
      throw result.value
    }
    const addressPath = join(__dirname, '..', 'data', 'mock', 'xml', 'address_userId_1.xml')
    const addressMock = await readFile(addressPath)

    expect(result.value.data).toStrictEqual(addressMock.toString())
  })

  test('Unauthorized user', async () => {
    const httpRequest = new RequestHttps()
    const baseUrl = process.env.API_TECH_BASEURL || ''

    const authorization = ''

    const response = await httpRequest.get<string>(`${baseUrl}/users?limit=2&page=1`, {
      headers: {
        Authorization: `Basic ${authorization}`
      }
    })

    expect(response.value).toBeInstanceOf(RequestHttpsGetError)
  })
})
