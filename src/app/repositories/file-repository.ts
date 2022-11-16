import { FileEntity } from '@/core/entities'
import { Either } from '@/shared/error/Either'
import { FileAlreadyCreateError, FileCreateError, FileDeleteError, FileFindByNameError } from '../errors/file-error'

export interface FileRepository {
  create: (file: FileEntity) => Promise<Either<FileCreateError | FileAlreadyCreateError, boolean>>
  findByName: (name: string) => Promise<Either<FileFindByNameError, any>>
  del: (file: FileEntity) => Promise<Either<FileDeleteError, boolean>>
}
