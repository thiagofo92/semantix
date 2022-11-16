import { FolderEntity } from '@/core/entities'
import { Either } from '@/shared/error/Either'
import { FolderCreateError, FolderFindByIdError, FolderNotFoundError } from '../errors/folder-error'

export interface FolderRepository {
  create: (folder: FolderEntity) => Promise<Either<FolderCreateError, boolean>>
  findByName: (name: string) => Promise<Either<FolderFindByIdError | FolderNotFoundError, { idFolder: string } | null>>
}
