export class RequestHttpsGetError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RequestHttpsGetError'
  }
}

export class RequestHttpsPostError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RequestHttpsPostError'
  }
}

export class RequestHttpsPutError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RequestHttpsPutError'
  }
}

export class RequestHttpsDelError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RequestHttpsDelError'
  }
}
