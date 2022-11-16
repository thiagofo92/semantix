import { FolderUseCaseContract } from '@/core/contract'
import { FolderEntity } from '@/core/entities'
import { badRequest, internalError, success, successToCreate } from '../helpers/response-helpers'
import { ResponseModel } from '../presenters/model/response-model'
import { RequestHttpsRepository } from '../repositories'
import { FolderRepository } from '../repositories/folder-repository'

export class FolderUseCase implements FolderUseCaseContract {
  constructor (
    private readonly folderService: FolderRepository,
    private readonly requestHttps: RequestHttpsRepository
  ) {}

  async create (folder: FolderEntity): Promise<ResponseModel> {
    if (!folder.idFolder || !folder.name) return badRequest(`Bad Request IdFolder: ${folder.idFolder} Name: ${folder.name}`)

    const result = await this.folderService.create(folder)

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
