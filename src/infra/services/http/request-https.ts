import Axios from 'axios'
import { RequestHttpsRepository, ResponseHttp } from '@/app/repositories/request-https-repository'
import { Either, left, right } from '@/shared/error/Either'
import {
  RequestHttpsDelError,
  RequestHttpsGetError,
  RequestHttpsPostError,
  RequestHttpsPutError
} from '@/core/errors/http-request-error'

export class RequestHttps implements RequestHttpsRepository {
  async get <T = any>(): Promise<Either<RequestHttpsGetError, ResponseHttp<T>>> {
    try {
      const result = await Axios.get()
      return right(result)
    } catch (error: any) {
      return left(new RequestHttpsGetError(error.message))
    }
  }

  async post <T = any>(): Promise<Either<RequestHttpsPostError, ResponseHttp<T>>> {
    try {
      const result = await Axios.get()
      return right(result)
    } catch (error: any) {
      return left(new RequestHttpsPostError(error.message))
    }
  }

  async put <T = any>(): Promise<Either<RequestHttpsPutError, ResponseHttp<T>>> {
    try {
      const result = await Axios.get()
      return right(result)
    } catch (error: any) {
      return left(new RequestHttpsPutError(error.message))
    }
  }

  async del <T = any>(): Promise<Either<RequestHttpsDelError, ResponseHttp<T>>> {
    try {
      const result = await Axios.get()
      return right(result)
    } catch (error: any) {
      return left(new RequestHttpsDelError(error.message))
    }
  }
}
