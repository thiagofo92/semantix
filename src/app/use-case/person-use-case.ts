import { PersonEntity } from '@/core/entities/person-entity'
import { PersonService } from '@/infra/services/db/memory'
import { PersonModel } from '@/app/models/person-model'

export class PersonUseCase {
  constructor (private readonly personService: PersonService) {}

  async create (person: PersonModel): Promise<boolean> {
    const personEntity: PersonEntity = {
      fullName: '',
      email: '',
      address: '',
      addressNumber: 0,
      phoneNumber: ''
    }
    const result = await this.personService.create(personEntity)

    if (result.isLeft()) return false

    return true
  }
}
