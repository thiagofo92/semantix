import { XmlToJsonRepository } from '@/app/repositories/xml-to-json-repository'
import { XmlConvertError } from '@/core/errors/convert-error'
import { Either, right, left } from '@/shared/error/Either'
import { Parser } from 'xml2js'

export class XmlToJsonService implements XmlToJsonRepository {
  async execute<T = any>(xml: string): Promise<Either<XmlConvertError, T>> {
    try {
      const { parseStringPromise } = new Parser({ trim: true })
      const convertedData = await parseStringPromise(xml)
      return right(convertedData)
    } catch (error: any) {
      return left(new XmlConvertError(error.message))
    }
  }
}
