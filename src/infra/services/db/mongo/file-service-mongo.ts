import { FileCreateError, FileAlreadyCreateError, FileFindByNameError, FileDeleteError } from '@/app/errors/file-error'
import { FileRepository } from '@/app/repositories/file-repository'
import { FileEntity } from '@/core/entities'
import { Either, left, right } from '@/shared/error/Either'
import { FileModel } from './schema/file-schema'

export class FileServiceMongo implements FileRepository {
  async create (file: FileEntity): Promise<Either<FileCreateError | FileAlreadyCreateError, boolean>> {
    try {
      await FileModel.create({
        id_file: file.idFile,
        id_folder: file.idFolder,
        name: file.name
      })

      return right(true)
    } catch (error: any) {
      return left(new FileCreateError(error.message))
    }
  }

  async findByName (name: string): Promise<Either<FileFindByNameError, FileEntity | null>> {
    try {
      const file = await FileModel.findOne({
        name
      })
      if (!file) return right(null)

      return right({
        id: file._id.toString(),
        idFile: file.id_file || '',
        idFolder: file.id_folder,
        name: file.name
      })
    } catch (error: any) {
      return left(new FileFindByNameError(error.message))
    }
  }

  async del (file: FileEntity): Promise<Either<FileDeleteError, boolean>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new FileDeleteError(error.message))
    }
  }
}
