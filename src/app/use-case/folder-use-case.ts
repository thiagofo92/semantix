import { FolderUseCaseContract } from '@/core/contract'
import { FolderEntity } from '@/core/entities'
import { GoFileCreateEntity, GoFileResponseCreateFolderEntity } from '@/core/entities/go-file-entity'
import qs from 'qs'
import { badRequest, internalError, success, successToCreate } from '../helpers/response-helpers'
import { FolderModel } from '../models'
import { ResponseModel } from '../presenters/model/response-model'
import { RequestHttpsRepository } from '../repositories'
import { FolderRepository } from '../repositories/folder-repository'

export class FolderUseCase implements FolderUseCaseContract {
  constructor (
    private readonly folderService: FolderRepository,
    private readonly requestHttps: RequestHttpsRepository
  ) {}

  async create (folderModel: FolderModel): Promise<ResponseModel> {
    if (!folderModel.parentIdFolder || !folderModel.name) {
      return badRequest(`Bad Request IdFolder: ${folderModel.parentIdFolder} Name: ${folderModel.name}`)
    }
    const gofileCreate: GoFileCreateEntity = {
      token: folderModel.token,
      parentFolderId: folderModel.parentIdFolder,
      folderName: folderModel.name
    }

    const data = qs.stringify(gofileCreate)
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const goFileFolder = await this.requestHttps.put<GoFileResponseCreateFolderEntity>('', data, options)

    if (goFileFolder.isLeft()) return internalError(`Message: ${goFileFolder.value.message}`)

    const folderEntity: FolderEntity = {
      parentIdFolder: goFileFolder.value.data.data.id,
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

    return success(result.value)
  }
}
