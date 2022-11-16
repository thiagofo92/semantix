import { FolderEntity } from '@/core/entities'
import { Either } from '@/shared/error/Either'
import { FolderCreateError, FolderFindByIdError } from '../errors/folder-error'

export interface FolderRepository {
  create: (folder: FolderEntity) => Promise<Either<FolderCreateError, boolean>>
  findById: (name: string) => Promise<Either<FolderFindByIdError, { idFolder: string }>>
}
