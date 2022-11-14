import {
  RequestHttpsGetError,
  RequestHttpsPostError,
  RequestHttpsDelError,
  RequestHttpsPutError
} from '@/core/errors/http-request-error'
import { Either } from '@/shared/error/Either'

export interface ResponseHttp<T> {
  data: T
  statusCode: number
  text: string
}

export interface RequestHttpsRepository {
  get: <T = any>() => Promise<Either<RequestHttpsGetError, ResponseHttp<T>>>
  post: <T = any> () => Promise<Either<RequestHttpsPostError, ResponseHttp<T>>>
  put: <T = any> () => Promise<Either<RequestHttpsPutError, ResponseHttp<T>>>
  del: <T = any> () => Promise<Either<RequestHttpsDelError, ResponseHttp<T>>>
}
