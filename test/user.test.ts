import { describe, vi, expect, test } from 'vitest'
import { readFile } from 'fs/promises'
import { join } from 'path'
interface HttpRequest {
  get: () => Promise<any>
}


class HttpRequestMock implements HttpRequest {
  async get (): Promise<any> {
    const pathXml = join(__dirname, 'data', 'mock', 'xml', 'users.xml')
    const userXml = readFile(pathXml)
    return userXml
  }
}

describe('#Convert user data XML', () => {
  test('Success to convert user data XML to JSON', async () => {
    const httpRequest = new HttpRequestMock()

    const userXml = await httpRequest.get()
    const expectedUser = {
      fullName: 'Nakia Towne',
      email:'Melissa.Stamm84@hotmail.com<'
    }

    const service = new ServiceXmlToJson()
    const userJson = await service.execute(userXml)

    expect(userJson).toStrictEqual(expectedUser)
  })
})