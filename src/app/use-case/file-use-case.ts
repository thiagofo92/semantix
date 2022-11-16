import { FileUseCaseContract } from '@/core/contract/file-contract'
import { FileEntity } from '@/core/entities'
import { GoFileResponseServerEntity, GoFileResponseUploadEntity } from '@/core/entities/go-file-entity'
import { internalError, notFound, success, successToCreate } from '../helpers/response-helpers'
import { FileUploadModel } from '../models/file-model'
import { ResponseModel } from '../presenters/model/response-model'
import { RequestHttpsRepository } from '../repositories'
import { FileRepository } from '../repositories/file-repository'
import { FolderRepository } from '../repositories/folder-repository'
import { goFile } from '../util/go-file'
import FormData from 'form-data'

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

    const getServerStore = await this.requestHttps.get<GoFileResponseServerEntity>('')

    if (getServerStore.isLeft()) return internalError(getServerStore.value.message)

    const serverStore = getServerStore.value.data.data.server
    const url = `http://${serverStore}.${goFile.urlUploadFile}`
    const formData = new FormData()
    formData.append('token', fileUpload.token)
    formData.append('folderId', result.value.idFolder)
    formData.append('file', fileUpload.file)

    const options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const responseUploadFile = await this.requestHttps.post<GoFileResponseUploadEntity>(url, formData, options)

    if (responseUploadFile.isLeft()) return internalError(responseUploadFile.value.message)

    const fileEntity: FileEntity = {
      idFile: responseUploadFile.value.data.data.fileId,
      idFolder: result.value.idFolder,
      name: responseUploadFile.value.data.data.fileName
    }

    const file = await this.fileService.create(fileEntity)

    if (file.isLeft()) return internalError(file.value.message)
    return successToCreate(file.value)
  }

  async del (name: string): Promise<ResponseModel> {
    return success(true)
  }
}
