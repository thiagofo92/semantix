import { FileUseCaseContract } from '@/core/contract/file-contract'
import { RequestContract, ResponseContract } from '@/main/contract'

export class FileController {
  constructor (
    private readonly fileUseCase: FileUseCaseContract
  ) {}

  async create ({ body }: RequestContract<any>): Promise<ResponseContract> {
    const result = await this.fileUseCase.create(body)
    return result
  }
}
