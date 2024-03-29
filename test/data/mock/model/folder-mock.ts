import { FolderModel } from '@/app/models/folder-model'
import { faker } from '@faker-js/faker'

export function folderModelMock (): FolderModel {
  return {
    parentFolderId: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    name: faker.lorem.words(1)
  }
}
