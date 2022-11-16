import { FolderController } from '@/app/controllers'
import { FolderUseCase } from '@/app/use-case'
import { FolderServiceMongo } from '@/infra/services/db/mongo/folder-service-mongo'
import { RequestHttps } from '@/infra/services/http/request-https'

export function factoryFolderController (): FolderController {
  const folderService = new FolderServiceMongo()
  const requestHttps = new RequestHttps()
  const folderUseCase = new FolderUseCase(folderService, requestHttps)
  const controller = new FolderController(folderUseCase)
  return controller
}
