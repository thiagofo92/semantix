export class FileCreateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FileCreateError'
  }
}

export class FileAlreadyCreateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FileAlreadyCreateError'
  }
}

export class FileDeleteError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FileDeleteError'
  }
}

export class FileFindByNameError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FileFindByNameError'
  }
}
