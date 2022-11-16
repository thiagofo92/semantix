import { FileCreateError, FileAlreadyCreateError, FileFindByNameError, FileDeleteError } from '@/app/errors/file-error'
import { FileRepository } from '@/app/repositories/file-repository'
import { FileEntity } from '@/core/entities'
import { Either, right } from '@/shared/error/Either'

export class FileServiceMemory implements FileRepository {
  private readonly fileEntity: FileEntity[] = []
  async create (file: FileEntity): Promise<Either<FileCreateError | FileAlreadyCreateError, boolean>> {
    this.fileEntity.push(file)
    return right(true)
  }

  async findByName (name: string): Promise<Either<FileFindByNameError, any>> {
    this.fileEntity.find(item => item.name === name)
    return right(true)
  }

  async del (file: FileEntity): Promise<Either<FileDeleteError, boolean>> {
    const index = this.fileEntity.findIndex(item => item.name === file.name)
    this.fileEntity.splice(index, 1)
    return right(true)
  }
}
