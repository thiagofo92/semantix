import { FolderServiceMemory } from '@test/services/mock/db/memory/folder-service-memory'
import { describe, vi, test, expect } from 'vitest'
import { FolderUseCase } from '@/app/use-case'
import { folderModelMock } from '@test/data/mock/model/folder-mock'
import { FolderCreateError } from '@/app/errors/folder-error'
import { left } from '@/shared/error/Either'
import { RequesHttpsGoFileFake } from '@test/services/mock/request-https-gofile-fake'

interface Factory {
  sut: FolderUseCase
  folderServiceMemory: FolderServiceMemory
}

function factoryFolderUseCase (): Factory {
  const folderServiceMemory = new FolderServiceMemory()
  const requestHttps = new RequesHttpsGoFileFake()
  const sut = new FolderUseCase(folderServiceMemory, requestHttps)
  return {
    sut,
    folderServiceMemory
  }
}

describe('# Folder use case', () => {
  test('Success to create folder', async () => {
    const { sut } = factoryFolderUseCase()
    const folderMock = folderModelMock()

    const result = await sut.create(folderMock)

    expect(result.data).toStrictEqual(true)
  })

  test('Fail to create folder', async () => {
    const { sut, folderServiceMemory } = factoryFolderUseCase()
    vi.spyOn(folderServiceMemory, 'create').mockResolvedValueOnce(left(new FolderCreateError('')))

    const folderMock = folderModelMock()
    const result = await sut.create(folderMock)

    expect(result.statusCode).toStrictEqual(500)
  })

  test('Success to find folder by name', async () => {
    const { sut } = factoryFolderUseCase()
    const folderMock = folderModelMock()

    const result = await sut.create(folderMock)
    const folder = await sut.findByName(folderMock.name)

    expect(result.data).toStrictEqual(true)

    const exist = !!folder.data.idFolder
    expect(exist).toStrictEqual(true)
  })

  test('Folder not found', async () => {
    const { sut } = factoryFolderUseCase()
    const folderMock = folderModelMock()

    await sut.create(folderMock)
    const folder = await sut.findByName('123123')

    expect(folder.statusCode).toStrictEqual(404)
  })

  test('Success to delete folder by name', async () => {
    const { sut } = factoryFolderUseCase()
    const folderMock = folderModelMock()

    await sut.create(folderMock)
    const folder = await sut.del(folderMock.name)

    expect(folder.data).toStrictEqual(true)
  })
})
