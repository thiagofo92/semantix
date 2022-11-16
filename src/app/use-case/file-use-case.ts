import { FileUseCaseContract } from '@/core/contract/file-contract'
import { FileEntity } from '@/core/entities'
import { GoFileResponseServerEntity, GoFileUploadEntity } from '@/core/entities/go-file-entity'
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

    const response = await this.requestHttps.get<GoFileResponseServerEntity>('')

    if (response.isLeft()) return internalError(response.value.message)

    const serverStore = response.value.data.data.server
    const goFileUpload: GoFileUploadEntity = {
      token: fileUpload.token,
      folderId: result.value.idFolder,
      file: fileUpload.file
    }

    const fileEntity: FileEntity = {

    }

    return successToCreate(true)
  }

  async del (name: string): Promise<ResponseModel> {
    return success(true)
  }
}
