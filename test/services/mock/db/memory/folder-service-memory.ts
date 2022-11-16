import { FolderCreateError, FolderFindByIdError } from '@/app/errors/folder-error'
import { FolderRepository } from '@/app/repositories/folder-repository'
import { FolderEntity } from '@/core/entities'
import { Either, left, right } from '@/shared/error/Either'

export class FolderServiceMemory implements FolderRepository {
  private readonly folder: FolderEntity [] = []
  async create (folder: FolderEntity): Promise<Either<FolderCreateError, boolean>> {
    try {
      this.folder.push(folder)
      return right(true)
    } catch (error: any) {
      return left(new FolderCreateError('Folder Service memory'))
    }
  }

  async findByName (name: string): Promise<Either<FolderFindByIdError, { idFolder: string } | null>> {
    try {
      const result = this.folder.find(item => item.name === name)

      if (!result) return right(null)

      return right({
        idFolder: result.folderId
      })
    } catch (error: any) {
      return left(new FolderFindByIdError('Folder Service memory'))
    }
  }
}
