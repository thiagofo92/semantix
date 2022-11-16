import { FolderCreateError, FolderFindByIdError } from '@/app/errors/folder-error'
import { FolderRepository } from '@/app/repositories/folder-repository'
import { Either, left, right } from '@/shared/error/Either'

export class FolderServiceMongo implements FolderRepository {
  async create (name: string): Promise<Either<FolderCreateError, boolean>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new FolderCreateError(error.message))
    }
  }

  async findById (name: string): Promise<Either<FolderFindByIdError, { idfolder: string }>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new FolderFindByIdError(error.message))
    }
  }
}
