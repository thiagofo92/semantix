import { RequestOptions as RequestOptionsHttps } from 'https'
import { RequestOptions as RequestOptionsHttp } from 'http'

export type RequestParams = 'body' | 'params' | 'query' | 'file'

export type RequestContract<T = any> = Record<RequestParams, T>
export interface ResponseContract { statusCode: number, data: any }

export interface HttpRequestContract {
  post: <T = any>(url: string, body: any, options?: RequestOptionsHttp | RequestOptionsHttps) => Promise<T>
  get: <T = any>(url: string, options?: RequestOptionsHttp | RequestOptionsHttps) => Promise<T>
  put: <T = any>(url: string, body: any, options?: RequestOptionsHttp | RequestOptionsHttps) => Promise<T>
  del: <T = any>(url: string, body: any, options?: RequestOptionsHttp | RequestOptionsHttps) => Promise<T>
}
