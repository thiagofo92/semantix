import { FileUploadModel } from '@/app/models/file-model'
import { faker } from '@faker-js/faker'

export function fileModelMock (): FileUploadModel {
  return {
    token: faker.datatype.uuid(),
    file: Buffer.from(faker.image.city()),
    fileName: faker.lorem.words(3),
    folderName: faker.lorem.words(1)
  }
}
