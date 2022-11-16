import { RequestContract, ResponseContract } from '@/main/contract'

export class FolderController {
  constructor () {}
  async create ({ body }: RequestContract<any>): Promise<ResponseContract> {
    return {
      data: '',
      statusCode: 201
    }
  }
}
