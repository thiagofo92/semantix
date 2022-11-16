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
