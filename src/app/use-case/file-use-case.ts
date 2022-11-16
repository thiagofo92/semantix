import { FileUseCaseContract } from '@/core/contract/file-contract'
import { internalError, notFound, success, successToCreate } from '../helpers/response-helpers'
import { FileUploadModel } from '../models/file-model'
import { ResponseModel } from '../presenters/model/response-model'
import { RequestHttpsRepository } from '../repositories'
import { FileRepository } from '../repositories/file-repository'
import { FolderRepository } from '../repositories/folder-repository'

export class FileUseCase implements FileUseCaseContract {
  constructor (
    private readonly fileService: FileRepository,
    private readonly folderService: FolderRepository,
    private readonly requestHttps: RequestHttpsRepository
  ) {}

  async create (fileUpload: FileUploadModel): Promise<ResponseModel> {
    const result = await this.folderService.findByName(fileUpload.name)

    if (result.isLeft()) return internalError(result.value.message)

    if (!result.value) return notFound('Folder name not found')

    return successToCreate(true)
  }

  async del (name: string): Promise<ResponseModel> {
    return success(true)
  }
}
