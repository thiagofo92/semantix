import { XmlConvertError } from '@/core/errors/convert-error'
import { Either } from '@/shared/error/Either'

export interface XmlToJsonRepository {
  execute: <T = any>(xml: string) => Promise<Either<XmlConvertError, T>>
}
