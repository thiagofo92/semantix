import { describe, vi, expect, test } from 'vitest'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Parser } from 'xml2js'
interface HttpRequest {
  get: () => Promise<any>
}


class HttpRequestFake implements HttpRequest {
  async get (): Promise<any> {
    const pathXml = join(__dirname, 'data', 'mock', 'xml', 'users.xml')
    const userXml = readFile(pathXml)
    return userXml
  }
}

type XmlFile<T> = {
  data: { [key in keyof T]: T[key] }
}

type XmlPagination = { 
  pagination: { page: { _: '1', '$': Object[] }, limit: { _: string, '$': Object[] } },
}

type XmlUsers = {
  usersList: {
    '$': { type: string },
    item: {
      createdAt: string,
      firstName: string,
      avatar: string,
      email: string,
      lastName: string,
      id: string,
    }[]
  } 
}

type DataUsersXml = XmlFile<XmlPagination & XmlUsers>

class ServiceXmlToJson {
  async execute<T = any>(xml: string): Promise<T | null> {
    try {
      const { parseStringPromise } = new Parser({ explicitArray: false, trim: true })
      const convertedData = await parseStringPromise(xml)
      return convertedData
    } catch (error) {
      return null
    }
  }
}

describe('#Convert user data XML', () => {
  test('Success to convert user XML to Object', async () => {
    const httpRequest = new HttpRequestFake()
    const userXml = await httpRequest.get()
    const expectedUser = {
      avatar: "https://cdn.fakercloud.com/avatars/al_li_128.jpg",
      createdAt: "2022-02-23T05:20:06.524Z",
      email: "Melissa.Stamm84@hotmail.com",
      firstName: "Nakia",
      id: "1",
      lastName: "Towne",
    }

    const service = new ServiceXmlToJson()
    const users = await service.execute<DataUsersXml>(userXml) as DataUsersXml
    const { usersList } = users.data

    expect(usersList.item[0]).toMatchObject(expectedUser)
  })

  test('Fail to convert file XML to Object', async () => {
    const service = new ServiceXmlToJson()
    const users = await service.execute<DataUsersXml>('')

    expect(users).toBeNull()
  })
})