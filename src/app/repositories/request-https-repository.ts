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

type Options = {
  [key in string]: string
}

export interface HeaderOptions {
  headers: Options
}

export interface RequestHttpsRepository {
  get: <T = any>(url: string, options?: HeaderOptions) => Promise<Either<RequestHttpsGetError, ResponseHttp<T>>>
  post: <T = any> (url: string, body: any, options?: HeaderOptions) => Promise<Either<RequestHttpsPostError, ResponseHttp<T>>>
  put: <T = any> (url: string, body: any, options?: HeaderOptions) => Promise<Either<RequestHttpsPutError, ResponseHttp<T>>>
  del: <T = any> (url: string, options?: HeaderOptions) => Promise<Either<RequestHttpsDelError, ResponseHttp<T>>>
}
