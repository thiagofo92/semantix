export interface GoFileResponseUploadEntity {
  status: string
  data: {
    downloadPage: string
    code: string
    parentFolder: string
    fileId: string
    fileName: string
    md5: string
  }
}

export interface GoFileResponseServerEntity {
  status: string
  data: {
    server: string
  }
}

export interface GoFileResponseCreateFolderEntity {
  status: string
  data: {
    id: string
    type: string
    name: string
    parentFolder: string
    createTime: number
    childs: string
    code: string
  }
}

export interface GoFileResponseDeleteContentEntity {
  status: string
  data: {}
}

export interface GoFileCreateEntity {
  parentFolderId: string
  token: string
  folderName: string
}

export interface GoFileUploadEntity {
  file: Buffer
  token: string
  folderId: string
}
