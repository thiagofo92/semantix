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
    const { body, params, query } = req

    const result = await fn({ body, params, query })
    res.status(result.statusCode).json(result.data)
  }
}
