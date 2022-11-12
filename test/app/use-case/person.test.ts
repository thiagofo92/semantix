import { describe, vi, expect, test } from "vitest";
import { PersonService } from "@/infra/services/db";
import { PersonUseCase } from "@/app/use-case/person-use-case";

describe('# Use case to create the user in Mango DB', () => {
  test('Create user in DB', async () => {
    const personService = new PersonService();
    const usecase = new PersonUseCase(personService) 

    const result = await usecase.create()

    expect(result).toStrictEqual(true)
  })
})