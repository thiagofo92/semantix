import { FolderCreateError, FolderFindByIdError } from '@/app/errors/folder-error'
import { FolderRepository } from '@/app/repositories/folder-repository'
import { Either, left, right } from '@/shared/error/Either'
import { FolderModel } from './schema'

export class FolderServiceMongo implements FolderRepository {
  async create (idFolder: string, name: string): Promise<Either<FolderCreateError, boolean>> {
    try {
      await FolderModel.create({
        id_folder: idFolder,
        name
      })
      return right(true)
    } catch (error: any) {
      return left(new FolderCreateError(error.message))
    }
  }

  async findById (name: string): Promise<Either<FolderFindByIdError, { idFolder: string }>> {
    try {
      const folder = await FolderModel.findOne({
        name
      })
      return right({
        idFolder: folder ? folder.id_folder : ''
      })
    } catch (error: any) {
      return left(new FolderFindByIdError(error.message))
    }
  }
}
