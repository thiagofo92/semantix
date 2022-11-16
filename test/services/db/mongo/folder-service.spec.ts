import { describe, vi, test, expect } from 'vitest'

describe('# Folder Tes', () => {
  test('Create folder', async () => {
    const folderService = new FolderService()
    const result = await folderService.create('test')
    expect(result).toStrictEqual(true)
  })
})
