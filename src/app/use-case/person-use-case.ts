import { PersonEntity } from "@/core/entities/person-entity";
import { PersonService } from "@/infra/services/db/memory";

export class PersonUseCase {
  constructor(private readonly personService: PersonService) {}

  async create(): Promise<boolean> {
    const personEntity: PersonEntity = {
      fullName: "",
      email: "",
      address: "",
      addressNumber: 0,
      phoneNumber: ""
    }
    const result = await this.personService.create(personEntity)

    if(result.isLeft()) return false

    return true
  }
}