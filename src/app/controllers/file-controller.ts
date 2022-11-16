import { FileUseCaseContract } from '@/core/contract/file-contract'
import { RequestContract, ResponseContract } from '@/main/contract'
import { badRequest } from '../helpers/response-helpers'
import { FileUploadModel } from '../models/file-model'
import { GO_FILE_TOKEN } from './token'

interface FolderID {
  folderName: string
}
interface FileMulter {
  buffer: Buffer
  encoding: string
  fieldname: string
  mimetype: string
  originalname: string
  size: number
}

interface FileDelete {
  fileName: string
}
export class FileController {
  constructor (
    private readonly fileUseCase: FileUseCaseContract
  ) {
    this.create = this.create.bind(this)
    this.del = this.del.bind(this)
  }

  async create (data: RequestContract<any>): Promise<ResponseContract> {
    const file = data.file as FileMulter
    const body = data.body as FolderID

    if (!file || !body) return badRequest(`Missing parameters file or FolderId`)

    const fileModel: FileUploadModel = {
      file: file.buffer,
      folderName: body.folderName,
      token: GO_FILE_TOKEN,
      fileName: file.originalname
    }

    const result = await this.fileUseCase.create(fileModel)
    return result
  }

  async del ({ query }: RequestContract<FileDelete>): Promise<ResponseContract> {
    const result = await this.fileUseCase.del(query.fileName)
    return result
  }
}
