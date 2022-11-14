import { XmlConvertError } from '@/core/errors/convert-error'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { describe, expect, test } from 'vitest'
import { HttpRequestFake } from './mock/RequestHttpsFake'

interface XmlFile<T> {
  data: { [key in keyof T]: T[key] }
}

interface XmlPagination {
  pagination: { page: { _: '1', '$': Object[] }, limit: { _: string, '$': Object[] } }
}

interface XmlUsers {
  usersList: {
    '$': { type: string }
    item: Array<{
      createdAt: string
      firstName: string
      avatar: string
      email: string
      lastName: string
      id: string
    }>
  }
}

type DataUsersXml = XmlFile<XmlPagination & XmlUsers>

describe('#Convert user data XML', () => {
  test('Success to convert user XML to Object', async () => {
    const httpRequest = new HttpRequestFake()
    const reponse = await httpRequest.get<string>()

    const expectedUser = {
      avatar: 'https://cdn.fakercloud.com/avatars/al_li_128.jpg',
      createdAt: '2022-02-23T05:20:06.524Z',
      email: 'Melissa.Stamm84@hotmail.com',
      firstName: 'Nakia',
      id: '1',
      lastName: 'Towne'
    }

    const service = new XmlToJsonService()
    const { value } = await service.execute<DataUsersXml>(reponse.data)
    const { data } = value as DataUsersXml
    const { usersList } = data

    expect(usersList.item[0]).toMatchObject(expectedUser)
  })

  test('Fail to convert file XML to Object', async () => {
    const service = new XmlToJsonService()
    const data = await service.execute<DataUsersXml>(null as any)

    expect(data.value).toBeInstanceOf(XmlConvertError)
  })
})
