import { FolderUseCaseContract } from '@/core/contract'
import { FolderEntity } from '@/core/entities'
import { GoFileCreateEntity, GoFileResponseCreateFolderEntity } from '@/core/entities/go-file-entity'
import qs from 'qs'
import { GO_FILE_TOKEN } from '../controllers/token'
import { badRequest, internalError, notFound, success, successToCreate } from '../helpers/response-helpers'
import { FolderModel } from '../models'
import { ResponseModel } from '../presenters/model/response-model'
import { RequestHttpsRepository } from '../repositories'
import { FolderRepository } from '../repositories/folder-repository'
import { goFile } from '../util/go-file'

export class FolderUseCase implements FolderUseCaseContract {
  constructor (
    private readonly folderService: FolderRepository,
    private readonly requestHttps: RequestHttpsRepository
  ) {}

  async create (folderModel: FolderModel): Promise<ResponseModel> {
    if (!folderModel.parentFolderId || !folderModel.name) {
      return badRequest(`Bad Request parentFolderId: ${folderModel.parentFolderId} Name: ${folderModel.name}`)
    }
    const gofileCreate: GoFileCreateEntity = {
      token: folderModel.token,
      parentFolderId: folderModel.parentFolderId,
      folderName: folderModel.name
    }

    const data = qs.stringify(gofileCreate)
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const goFileFolder = await this.requestHttps.put<GoFileResponseCreateFolderEntity>(goFile.urlCreateFolder, data, options)

    if (goFileFolder.isLeft()) return internalError(`Message: ${goFileFolder.value.message}`)

    const folderEntity: FolderEntity = {
      folderId: goFileFolder.value.data.data.id,
      name: goFileFolder.value.data.data.name
    }

    const result = await this.folderService.create(folderEntity)

    if (result.isLeft()) return internalError(`Message: ${result.value.message}`)

    return successToCreate(result.value)
  }

  async findByName (name: string): Promise<ResponseModel> {
    const result = await this.folderService.findByName(name)

    if (!name) return badRequest(`Bad request, use a valid name`)

    if (result.isLeft()) return internalError(`Message: ${result.value.message}`)

    if (!result.value) return notFound('Folder not found')

    return success(result.value)
  }

  async del (name: string): Promise<ResponseModel> {
    const folder = await this.folderService.findByName(name)

    if (!name) return badRequest(`Bad request, use a valid name`)

    if (folder.isLeft()) return internalError(`Message: ${folder.value.message}`)

    const deleteFile = {
      token: GO_FILE_TOKEN,
      contentsId: folder.value?.idFolder
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
