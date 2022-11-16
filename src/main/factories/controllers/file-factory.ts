import { FileController } from '@/app/controllers'
import { FileUseCase } from '@/app/use-case/file-use-case'
import { FileServiceMongo } from '@/infra/services/db/mongo/file-service-mongo'
import { FolderServiceMongo } from '@/infra/services/db/mongo/folder-service-mongo'
import { RequestHttps } from '@/infra/services/http/request-https'

export function factoryFileController (): FileController {
  const fileService = new FileServiceMongo()
  const folderService = new FolderServiceMongo()
  const requestHttps = new RequestHttps()
  const fileUseCase = new FileUseCase(fileService, folderService, requestHttps)
  const controller = new FileController(fileUseCase)
  return controller
}
