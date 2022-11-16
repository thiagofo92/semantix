export class FolderCreateError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FolderCreateError'
  }
}

export class FolderFindByIdError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FolderFindByIdError'
  }
}

export class FolderNotFoundError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'FolderNotFoundError'
  }
}
