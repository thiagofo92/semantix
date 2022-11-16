import { FileUseCaseContract } from '@/core/contract/file-contract'
import { FolderNotFoundError } from '../errors/folder-error'
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

    if (result.isLeft()) {
      if (result.value instanceof FolderNotFoundError) {
        return notFound('Name not found, create the folder before upload the file')
      }

      return internalError(result.value.message)
    }

    return successToCreate(true)
  }

  async del (name: string): Promise<ResponseModel> {
    return success(true)
  }
}
