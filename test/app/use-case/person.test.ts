import { describe, vi, expect, test } from "vitest";

describe('# Use case to create the user in Mango DB', () => {
  test('Create user in DB', async () => {
    const personService = new PersonService();
    const usecase = new PersonUseCase(personService) 

    const result = await usecase.execute()

    expect(result).toStrictEqual(true)
  })
})