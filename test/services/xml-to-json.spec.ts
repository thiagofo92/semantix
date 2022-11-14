import 'dotenv/config'
import { describe, expect, test } from 'vitest'

import { DataUsersXmlEntity } from '@/core/entities/xml-entity'
import { XmlConvertError } from '@/core/errors/convert-error'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { HttpRequestFake } from './mock/RequestHttpsFake'
import { RequestHttps } from '@/infra/services/http/request-https'
import { RequestHttpsGetError } from '@/core/errors'

describe('#Convert user data XML', () => {
  test('Success to convert user XML to Object', async () => {
    const httpRequest = new HttpRequestFake()
    const response = await httpRequest.get<string>('')

    const expectedUser = {
      avatar: 'https://cdn.fakercloud.com/avatars/al_li_128.jpg',
      createdAt: '2022-02-23T05:20:06.524Z',
      email: 'Melissa.Stamm84@hotmail.com',
      firstName: 'Nakia',
      id: '1',
      lastName: 'Towne'
    }

    if (response.isLeft()) {
      throw Error('Error to convert user XML to Object')
    }

    const service = new XmlToJsonService()

    const xml = await service.execute<DataUsersXmlEntity>(response.value.data)

    if (xml.isLeft()) {
      throw Error(`API linkapi-desafio-tech - Name: ${xml.value.name} Message: ${xml.value.message}`)
    }
    const { data } = xml.value
    const { usersList } = data

    expect(usersList.item[0]).toMatchObject(expectedUser)
  })

  test('Fail to convert file XML to Object', async () => {
    const service = new XmlToJsonService()
    const data = await service.execute<DataUsersXmlEntity>(null as any)

    expect(data.value).toBeInstanceOf(XmlConvertError)
  })

  test('Success to convert user XML to Object - Using API linkapi-desafio-tech', async () => {
    const httpRequest = new RequestHttps()
    const baseUrl = process.env.API_TECH_BASEURL || ''
    const user = process.env.API_TECH_USER || ''
    const password = process.env.API_TECH_PASSOWRD || ''

    const authorization = Buffer.from(`${user}:${password}`).toString('base64')

    const response = await httpRequest.get<string>(`${baseUrl}/users?limit=2&page=1`, {
      headers: {
        Authorization: `Basic ${authorization}`
      }
    })

    const expectedUser = {
      avatar: 'https://cdn.fakercloud.com/avatars/al_li_128.jpg',
      createdAt: '2022-02-23T05:20:06.524Z',
      email: 'Melissa.Stamm84@hotmail.com',
      firstName: 'Nakia',
      id: '1',
      lastName: 'Towne'
    }

    if (response.isLeft()) {
      throw Error(`API linkapi-desafio-tech - Name: ${response.value.name} Message: ${response.value.message}`)
    }

    const service = new XmlToJsonService()
    const xml = await service.execute<DataUsersXmlEntity>(response.value.data)

    if (xml.isLeft()) {
      throw Error(`API linkapi-desafio-tech - Name: ${xml.value.name} Message: ${xml.value.message}`)
    }
    const { data } = xml.value
    const { usersList } = data

    expect(usersList.item[0]).toMatchObject(expectedUser)
  })

  test('Failt to request users', async () => {
    const httpRequest = new RequestHttps()
    const baseUrl = process.env.API_TECH_BASEURL || ''
    const user = ''
    const password = ''

    const authorization = Buffer.from(`${user}:${password}`).toString('base64')

    const response = await httpRequest.get<string>(`${baseUrl}/users?limit=2&page=1`, {
      headers: {
        Authorization: `Basic ${authorization}`
      }
    })

    expect(response.value).toBeInstanceOf(RequestHttpsGetError)
  })
})