import 'dotenv/config'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
import { FolderServiceMongo } from '@/infra/services/db/mongo/folder-service-mongo'
import { FolderModel } from '@/infra/services/db/mongo/schema'
import { describe, vi, test, expect, afterAll, beforeAll, beforeEach } from 'vitest'
import { left } from '@/shared/error/Either'
import { FolderCreateError, FolderFindByIdError } from '@/app/errors/folder-error'
import { FolderEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

const folderMock: FolderEntity = {
  idFolder: faker.datatype.uuid(),
  name: 'folder-test'
}

describe('# Folder Tes', () => {
  beforeAll(async () => {
    await MongoConnection()
  })

  beforeEach(async () => {
    await FolderModel.deleteMany()
  })

  afterAll(async () => {
    const connection = await MongoConnection()
    await connection.disconnect()
  })

  test('Create folder', async () => {
    const folderService = new FolderServiceMongo()
    const result = await folderService.create(folderMock)

    expect(result.value).toStrictEqual(true)
  })

  test('Fail to create folder', async () => {
    const folderService = new FolderServiceMongo()
    vi.spyOn(folderService, 'create').mockResolvedValueOnce(left(new FolderCreateError('Test fail to create')))
    const result = await folderService.create(folderMock)

    expect(result.value).toBeInstanceOf(FolderCreateError)
  })

  test('Find folder by name', async () => {
    const folderService = new FolderServiceMongo()

    const result = await folderService.create(folderMock)
    const folder = await folderService.findById(folderMock.name)

    expect(result.value).toStrictEqual(true)
    if (folder.isLeft()) throw folder.value

    expect(folder.value.idFolder).toStrictEqual(folderMock.idFolder)
  })

  test('Error to find folder by name', async () => {
    const folderService = new FolderServiceMongo()
    vi.spyOn(folderService, 'findById').mockResolvedValueOnce(left(new FolderFindByIdError('Test fail to create')))
    const folder = await folderService.findById('test')

    expect(folder.value).toBeInstanceOf(FolderFindByIdError)
  })

  test('Folder not found', async () => {
    const folderService = new FolderServiceMongo()
    const folder = await folderService.findById('test')

    if (folder.isLeft()) throw folder.value

    expect(folder.value.idFolder).toStrictEqual('')
  })
})
