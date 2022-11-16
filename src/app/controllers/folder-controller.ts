import { FolderUseCaseContract } from '@/core/contract'
import { RequestContract, ResponseContract } from '@/main/contract'
import { FolderModel } from '../models'
import { GO_FILE_TOKEN } from './token'

interface FolderCreate {
  name: string
  parentFolderId: string
}

interface FolderDelete {
  folderName: string
}
export class FolderController {
  constructor (
    private readonly folderUseCase: FolderUseCaseContract
  ) {
    this.create = this.create.bind(this)
    this.del = this.del.bind(this)
  }

  async create ({ body }: RequestContract<FolderCreate>): Promise<ResponseContract> {
    const folderModel: FolderModel = {
      ...body,
      token: GO_FILE_TOKEN
    }
    const result = await this.folderUseCase.create(folderModel)
    return result
  }

  async del ({ query }: RequestContract<FolderDelete>): Promise<ResponseContract> {
    const result = await this.folderUseCase.del(query.folderName)
    return result
  }
}
