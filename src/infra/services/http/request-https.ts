import Axios from 'axios'
import {
  RequestHttpsRepository,
  RequestOptions,
  ResponseHttp
} from '@/app/repositories/request-https-repository'
import { Either, left, right } from '@/shared/error/Either'
import {
  RequestHttpsDelError,
  RequestHttpsGetError,
  RequestHttpsPostError,
  RequestHttpsPutError
} from '@/app/errors/http-request-error'

export class RequestHttps implements RequestHttpsRepository {
  async get <T = any>(url: string, options?: RequestOptions): Promise<Either<RequestHttpsGetError, ResponseHttp<T>>> {
    try {
      const result = await Axios.get(url, {
        headers: { ...options?.headers },
        params: options?.params
      })

      const response: ResponseHttp<T> = {
        statusCode: result.status,
        text: result.statusText,
        data: result.data
      }
      return right(response)
    } catch (error: any) {
      return left(new RequestHttpsGetError(error.message))
    }
  }

  async post <T = any>(url: string, body: any, options?: RequestOptions):
  Promise<Either<RequestHttpsPostError, ResponseHttp<T>>> {
    try {
      const result = await Axios.post(url, body, {
        headers: { ...options?.headers }
      })

      const response: ResponseHttp<T> = {
        statusCode: result.status,
        text: result.statusText,
        data: result.data
      }
      return right(response)
    } catch (error: any) {
      return left(new RequestHttpsPostError(error.message))
    }
  }

  async put <T = any>(url: string, body: any, options?: RequestOptions): Promise<Either<RequestHttpsPutError, ResponseHttp<T>>> {
    try {
      const result = await Axios.put(url, body, {
        headers: { ...options?.headers }
      })
      const response: ResponseHttp<T> = {
        statusCode: result.status,
        text: result.statusText,
        data: result.data
      }
      return right(response)
    } catch (error: any) {
      return left(new RequestHttpsPutError(error.message))
    }
  }

  async del <T = any>(url: string, body: any, options?: RequestOptions): Promise<Either<RequestHttpsDelError, ResponseHttp<T>>> {
    try {
      const result = await Axios.delete(url, {
        headers: { ...options?.headers },
        data: body
      })
      const response: ResponseHttp<T> = {
        statusCode: result.status,
        text: result.statusText,
        data: result.data
      }
      return right(response)
    } catch (error: any) {
      return left(new RequestHttpsDelError(error.message))
    }
  }
}
