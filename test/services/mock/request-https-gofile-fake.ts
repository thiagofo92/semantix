import {
  RequestHttpsRepository,
  RequestOptions,
  ResponseHttp
} from '@/app/repositories/request-https-repository'
import {
  RequestHttpsDelError,
  RequestHttpsGetError,
  RequestHttpsPostError,
  RequestHttpsPutError
} from '@/app/errors'
import { Either, right } from '@/shared/error/Either'
import {
  GoFileResponseCreateFolderEntity,
  GoFileResponseServerEntity,
  GoFileResponseUploadEntity
} from '@/core/entities/go-file-entity'
import { faker } from '@faker-js/faker'
import qs from 'qs'

export class RequesHttpsGoFileFake implements RequestHttpsRepository {
  async get <T = any>(url: string, options?: RequestOptions): Promise<Either<RequestHttpsGetError, ResponseHttp<T>>> {
    const server: GoFileResponseServerEntity = {
      status: 'ok',
      data: {
        server: 'store1'
      }
    }
    return right({
      data: server as T,
      statusCode: 200,
      text: 'Success'
    })
  }

  async post <T = any>(url: string, body: any, options?: RequestOptions):
  Promise<Either<RequestHttpsPostError, ResponseHttp<T>>> {
    const response: GoFileResponseUploadEntity = {
      status: 'ok',
      data: {
        downloadPage: 'https://gofile.io/d/Z19n9a',
        code: 'Z19n9a',
        parentFolder: '3dbc2f87-4c1e-4a81-badc-af004e61a5b4',
        fileId: '4991e6d7-5217-46ae-af3d-c9174adae924',
        fileName: 'example.mp4',
        md5: '10c918b1d01aea85864ee65d9e0c2305'
      }
    }
    return right({
      data: response as T,
      statusCode: 201,
      text: 'Success'
    })
  }

  async put <T = any>(url: string, body: any, options?: RequestOptions): Promise<Either<RequestHttpsPutError, ResponseHttp<T>>> {
    const data = qs.parse(body)
    const response: GoFileResponseCreateFolderEntity = {
      status: 'ok',
      data: {
        childs: '',
        code: '',
        createTime: 0,
        id: faker.datatype.uuid(),
        parentFolder: data.parentFolderId?.toString() || '',
        name: data.folderName?.toString() || '',
        type: ''
      }
    }

    return right({
      data: response as T,
      statusCode: 201,
      text: 'Success'
    })
  }

  async del <T = any>(url: string, options?: RequestOptions): Promise<Either<RequestHttpsDelError, ResponseHttp<T>>> {
    return right({
      data: '' as T,
      statusCode: 201,
      text: 'Success'
    })
  }
}
