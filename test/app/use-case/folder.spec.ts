import { FolderServiceMemory } from '@test/services/mock/db/memory/folder-service-memory'
import { describe, vi, test, expect } from 'vitest'

interface Factory {
  sut: FolderUseCase
  folderServiceMemory: FolderServiceMemory
}

function factoryFolderUseCase () {
  const folderServiceMemory = new FolderServiceMemory()
  const sut = new FolderUseCase(folderServiceMemory)
  return {
    sut,
    folderServiceMemory
  }
}

describe('# Folder use case', () => {
  test('Success to create folder', async () => {
    const { sut } = factoryFolderUseCase()
    const result = await sut.create()
    expect(result).toStrictEqual(true)
  })
})
