import { internalError } from '@/app/helpers/response-helpers'
import { Request, Response } from 'express'
import {
  RequestContract,
  ResponseContract
} from '../contract'

type FunctionController = (
  request: RequestContract,
) => Promise<ResponseContract>

export function ExpressAdapter (fn: FunctionController) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { body, params, query, file } = req

      const result = await fn({ body, params, query, file })
      res.status(result.statusCode).json(result.data)
    } catch (error: any) {
      const result = internalError(error.message)
      res.status(result.statusCode).json(result.data)
    }
  }
}
