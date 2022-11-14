import { describe, expect, test } from 'vitest'

import { DataUsersXmlEntity } from '@/core/entities/xml-entity'
import { XmlConvertError } from '@/core/errors/convert-error'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { HttpRequestFake } from './mock/RequestHttpsFake'

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

    const { value: xml } = await service.execute<DataUsersXmlEntity>(response.value.data)
    const { data } = xml as DataUsersXmlEntity
    const { usersList } = data

    expect(usersList.item[0]).toMatchObject(expectedUser)
  })

  test('Fail to convert file XML to Object', async () => {
    const service = new XmlToJsonService()
    const data = await service.execute<DataUsersXmlEntity>(null as any)

    expect(data.value).toBeInstanceOf(XmlConvertError)
  })
})
