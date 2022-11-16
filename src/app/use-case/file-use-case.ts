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
import { GO_FILE_TOKEN } from '../controllers/token'
import qs from 'qs'

export class FileUseCase implements FileUseCaseContract {
  constructor (
    private readonly fileService: FileRepository,
    private readonly folderService: FolderRepository,
    private readonly requestHttps: RequestHttpsRepository
  ) {}

  async create (fileUpload: FileUploadModel): Promise<ResponseModel> {
    const result = await this.folderService.findByName(fileUpload.folderName)

    if (result.isLeft()) return internalError(result.value.message)

    if (!result.value) return notFound('Not found folder name')

    const getServerStore = await this.requestHttps.get<GoFileResponseServerEntity>(goFile.urlGetServer)

    if (getServerStore.isLeft()) return internalError(getServerStore.value.message)

    const serverStore = getServerStore.value.data.data.server
    const url = `https://${serverStore}.${goFile.urlUploadFile}`
    const formData = new FormData()
    formData.append('token', fileUpload.token)
    formData.append('folderId', result.value.idFolder)
    formData.append('file', fileUpload.file, {
      filename: fileUpload.fileName
    })

    const options = {
      headers: {
        ...formData.getHeaders()
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
    const file = await this.fileService.findByName(name)

    if (!file) return notFound(`File ${name} not found`)

    if (file.isLeft()) return internalError(file.value)

    const deleteFile = {
      token: GO_FILE_TOKEN,
      contentsId: file.value?.idFile
    }

    const data = qs.stringify(deleteFile)
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const response = await this.requestHttps.del(goFile.urlDeleteContent, data, options)

    if (response.isLeft()) return internalError(response.value)

    return success(true)
  }
}
