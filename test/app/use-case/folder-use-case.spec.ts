import { FolderServiceMemory } from '@test/services/mock/db/memory/folder-service-memory'
import { describe, vi, test, expect } from 'vitest'
import { FolderUseCase } from '@/app/use-case'
import { folderModelMock } from '@test/data/mock/model/folder-mock'
import { FolderCreateError } from '@/app/errors/folder-error'
import { left } from '@/shared/error/Either'
import { RequesHttpsGoFIleFake } from '@test/services/mock/request-https-gofile-fake'

interface Factory {
  sut: FolderUseCase
  folderServiceMemory: FolderServiceMemory
}

function factoryFolderUseCase (): Factory {
  const folderServiceMemory = new FolderServiceMemory()
  const requestHttps = new RequesHttpsGoFIleFake()
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
    expect(folder.data.idFolder).toStrictEqual(folderMock.idFolder)
  })
})
