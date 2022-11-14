import { readFile } from 'fs/promises'
import { join } from 'path'

import { RequestHttps, ResponseHttp } from '@/app/repositories/request-https'

export class HttpRequestFake implements RequestHttps {
  async get <T = any>(): Promise<ResponseHttp<T>> {
    const pathXml = join(__dirname, '..', '..', 'data', 'mock', 'xml', 'users.xml')
    const userXml = await readFile(pathXml)

    return {
      data: userXml.toString() as T,
      statusCode: 200,
      text: 'Success'
    }
  }

  async post <T = any>(): Promise<ResponseHttp<T>> {
    return {
      data: '' as T,
      statusCode: 201,
      text: 'Success'
    }
  }

  async put <T = any>(): Promise<ResponseHttp<T>> {
    return {
      data: '' as T,
      statusCode: 200,
      text: 'Success'
    }
  }

  async del <T = any>(): Promise<ResponseHttp<T>> {
    return {
      data: '' as T,
      statusCode: 200,
      text: 'Success'
    }
  }
}
