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

type HeaderOptions = {
  [key in string]: string
}

export interface RequestOptions {
  headers: HeaderOptions
}

export interface RequestHttpsRepository {
  get: <T = any>(url: string, options?: RequestOptions) => Promise<Either<RequestHttpsGetError, ResponseHttp<T>>>
  post: <T = any> (url: string, body: any, options?: RequestOptions) => Promise<Either<RequestHttpsPostError, ResponseHttp<T>>>
  put: <T = any> (url: string, body: any, options?: RequestOptions) => Promise<Either<RequestHttpsPutError, ResponseHttp<T>>>
  del: <T = any> (url: string, options?: RequestOptions) => Promise<Either<RequestHttpsDelError, ResponseHttp<T>>>
}
