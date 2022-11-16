import { FolderUseCaseContract } from '@/core/contract'
import { RequestContract, ResponseContract } from '@/main/contract'

export class FolderController {
  constructor (
    private readonly folderUseCase: FolderUseCaseContract
  ) {}

  async create ({ body }: RequestContract<any>): Promise<ResponseContract> {
    const result = await this.folderUseCase.create(body)
    return result
  }
}
