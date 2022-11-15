export class XmlConvertError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'XmlConvertError'
  }
}
