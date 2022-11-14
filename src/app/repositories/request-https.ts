export interface ResponseHttp<T> {
  data: T
  statusCode: number
  text: string
}

export interface RequestHttps {
  get: <T = any>() => Promise<ResponseHttp<T>>
  post: <T = any> () => Promise<ResponseHttp<T>>
  put: <T = any> () => Promise<ResponseHttp<T>>
  del: <T = any> () => Promise<ResponseHttp<T>>
}
