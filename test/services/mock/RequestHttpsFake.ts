import { readFile } from 'fs/promises'
import { join } from 'path'

import { RequestHttpsRepository, HeaderOptions, ResponseHttp } from '@/app/repositories/request-https-repository'
import {
  RequestHttpsDelError,
  RequestHttpsGetError,
  RequestHttpsPostError,
  RequestHttpsPutError
} from '@/core/errors'
import { Either, right } from '@/shared/error/Either'

export class HttpRequestFake implements RequestHttpsRepository {
  async get <T = any>(url: string, options?: HeaderOptions): Promise<Either<RequestHttpsGetError, ResponseHttp<T>>> {
    const pathXml = join(__dirname, '..', '..', 'data', 'mock', 'xml', 'users.xml')
    const userXml = await readFile(pathXml)

    return right({
      data: userXml.toString() as T,
      statusCode: 200,
      text: 'Success'
    })
  }

  async post <T = any>(url: string, body: any, options?: HeaderOptions):
  Promise<Either<RequestHttpsPostError, ResponseHttp<T>>> {
    return right({
      data: '' as T,
      statusCode: 201,
      text: 'Success'
    })
  }

  async put <T = any>(url: string, body: any, options?: HeaderOptions): Promise<Either<RequestHttpsPutError, ResponseHttp<T>>> {
    return right({
      data: '' as T,
      statusCode: 201,
      text: 'Success'
    })
  }

  async del <T = any>(url: string, options?: HeaderOptions): Promise<Either<RequestHttpsDelError, ResponseHttp<T>>> {
    return right({
      data: '' as T,
      statusCode: 201,
      text: 'Success'
    })
  }
}
