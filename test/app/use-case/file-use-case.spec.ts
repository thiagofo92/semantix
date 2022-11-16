import { describe, test, expect, vi } from 'vitest'
import { fileModelMock } from '@test/data/mock/model'
import { FileServiceMemory, FolderServiceMemory } from '@test/services/mock/db/memory'
import { RequesHttpsGoFileFake } from '@test/services/mock/request-https-gofile-fake'
import { FileUseCase } from '@/app/use-case/file-use-case'
import { left, right } from '@/shared/error/Either'

interface Factory {
  sut: FileUseCase
  fileServiceMemory: FileServiceMemory
  folderServiceMemory: FolderServiceMemory
  requestHttps: RequesHttpsGoFileFake
}

function factoryFileUseCase (): Factory {
  const fileServiceMemory = new FileServiceMemory()
  const folderServiceMemory = new FolderServiceMemory()
  const requestHttps = new RequesHttpsGoFileFake()
  const sut = new FileUseCase(fileServiceMemory, folderServiceMemory, requestHttps)
  return {
    sut,
    fileServiceMemory,
    folderServiceMemory,
    requestHttps
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

  test('Success to delete file', async () => {
    const { sut, folderServiceMemory } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right({ idFolder: '12345' }))
    const result = await sut.del(fileModel.fileName)

    expect(result.data).toStrictEqual(true)
  })

  test('Folder not found', async () => {
    const { sut, folderServiceMemory } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right(null))
    const result = await sut.create(fileModel)

    expect(result.statusCode).toStrictEqual(404)
  })

  test('Error to create file - Unexpected error find folder by name', async () => {
    const { sut, folderServiceMemory } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(left(new Error()))
    const result = await sut.create(fileModel)

    expect(result.statusCode).toStrictEqual(500)
  })

  test('Error get server store', async () => {
    const { sut, folderServiceMemory, requestHttps } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right({ idFolder: '12345' }))
    vi.spyOn(requestHttps, 'get').mockResolvedValueOnce(left(new Error()))
    const result = await sut.create(fileModel)

    expect(result.statusCode).toStrictEqual(500)
  })

  test('Error to upload file', async () => {
    const { sut, folderServiceMemory, requestHttps } = factoryFileUseCase()
    const fileModel = fileModelMock()
    vi.spyOn(folderServiceMemory, 'findByName').mockResolvedValueOnce(right({ idFolder: '12345' }))
    vi.spyOn(requestHttps, 'post').mockResolvedValueOnce(left(new Error()))
    const result = await sut.create(fileModel)

    expect(result.statusCode).toStrictEqual(500)
  })
})
