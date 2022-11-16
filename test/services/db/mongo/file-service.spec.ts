import 'dotenv/config'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
import { FolderModel } from '@/infra/services/db/mongo/schema'
import { describe, vi, test, expect, afterAll, beforeAll, beforeEach } from 'vitest'
import { left } from '@/shared/error/Either'
import { FileModel } from '@/infra/services/db/mongo/schema/file-schema'
import { FileServiceMongo } from '@/infra/services/db/mongo/file-service-mongo'
import { FileEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'
import { FileCreateError, FileFindByNameError } from '@/app/errors/file-error'

const fileMock: FileEntity = {
  idFile: faker.datatype.uuid(),
  idFolder: faker.datatype.uuid(),
  name: 'file-test'
}

describe('# Folder Tes', () => {
  beforeAll(async () => {
    await MongoConnection()
  })

  beforeEach(async () => {
    await FolderModel.deleteMany()
    await FileModel.deleteMany()
  })

  afterAll(async () => {
    const connection = await MongoConnection()
    await connection.disconnect()
  })

  test('Update file', async () => {
    const fileService = new FileServiceMongo()
    const result = await fileService.create(fileMock)
    expect(result.value).toStrictEqual(true)
  })

  test('Fail to create file', async () => {
    const fileService = new FileServiceMongo()
    vi.spyOn(fileService, 'create').mockResolvedValueOnce(left(new FileCreateError('Test fail to create')))
    const result = await fileService.create(fileMock)

    expect(result.value).toBeInstanceOf(FileCreateError)
  })

  test('Error to find folder by name', async () => {
    const fileService = new FileServiceMongo()
    vi.spyOn(fileService, 'findByName').mockResolvedValueOnce(left(new FileFindByNameError('Test fail to create')))
    const folder = await fileService.findByName(fileMock.name)

    expect(folder.value).toBeInstanceOf(FileFindByNameError)
  })

  test('Find by name', async () => {
    const fileService = new FileServiceMongo()
    await fileService.create(fileMock)
    const file = await fileService.findByName(fileMock.name)

    if (file.isLeft()) throw file.value

    expect(file.value.name).toStrictEqual(fileMock.name)
  })

  test('Not found file name', async () => {
    const fileService = new FileServiceMongo()
    const folder = await fileService.findByName(fileMock.name)

    if (folder.isLeft()) throw folder.value

    expect(folder.value).toStrictEqual(null)
  })
})
