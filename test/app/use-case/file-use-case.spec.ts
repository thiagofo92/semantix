import { describe, test, expect, vi } from 'vitest'
import { fileModelMock } from '@test/data/mock/model'
import { FileServiceMemory, FolderServiceMemory } from '@test/services/mock/db/memory'
import { RequesHttpsGoFileFake } from '@test/services/mock/request-https-gofile-fake'
import { FileUseCase } from '@/app/use-case/file-use-case'
import { FileCreateError } from '@/app/errors/file-error'
import { left, right } from '@/shared/error/Either'
import { FolderNotFoundError } from '@/app/errors/folder-error'

interface Factory {
  sut: FileUseCase
  fileServiceMemory: FileServiceMemory
  folderServiceMemory: FolderServiceMemory
}

function factoryFileUseCase (): Factory {
  const fileServiceMemory = new FileServiceMemory()
  const folderServiceMemory = new FolderServiceMemory()
  const requestHttps = new RequesHttpsGoFileFake()
  const sut = new FileUseCase(fileServiceMemory, folderServiceMemory, requestHttps)
  return {
    sut,
    fileServiceMemory,
    folderServiceMemory
  }
}

describe('Test file use case', () => {
  test('Success to create file', async () => {
    const { sut, folderServiceMemory } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right({ idFolder: '12345' }))
    const result = await sut.create(fileModel)

    expect(result.data).toStrictEqual(true)
  })

  test('Error to create file - Folder not found', async () => {
    const { sut, fileServiceMemory, folderServiceMemory } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right(null))
    const result = await sut.create(fileModel)

    expect(result.statusCode).toStrictEqual(204)
  })
})
