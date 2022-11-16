import { FileUploadModel } from '@/app/models/file-model'
import { faker } from '@faker-js/faker'

export function fileModelMock (): FileUploadModel {
  return {
    token: faker.datatype.uuid(),
    file: faker.image.image(),
    folderId: faker.datatype.uuid()
  }
}
