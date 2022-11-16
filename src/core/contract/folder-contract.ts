import { FolderModel } from '@/app/models/folder-model'
import { ResponseModel } from '@/app/presenters/model/response-model'

export interface FolderUseCaseContract {
  create: (folder: FolderModel) => Promise<ResponseModel>
  findByName: (name: string) => Promise<ResponseModel>
  del: (name: string) => Promise<ResponseModel>
}
