import { PersonEntity } from '@/core/entities/person-entity'
import { PersonService } from '@/infra/services/db/memory'
import { PersonModel } from '@/app/models/person-model'

export class PersonUseCase {
  constructor (private readonly personService: PersonService) {}

  async create (person: PersonModel): Promise<boolean> {
    const personEntity = this.toPersonEntity(person)
    const result = await this.personService.create(personEntity)

    if (result.isLeft()) return false

    return true
  }

  private toPersonEntity (person: PersonModel): PersonEntity {
    const personEntity: PersonEntity = {
      fullName: '',
      email: '',
      address: '',
      addressNumber: '',
      phoneNumber: ''
    }

    personEntity.fullName = `${person.firstName} ${person.lastName}`
    personEntity.email = person.email
    personEntity.address = person.address[0].street
    personEntity.addressNumber = person.address[0].number
    personEntity.phoneNumber = person.contact[0].phoneNumber

    return personEntity
  }

  private toPersonEntityArray (person: PersonModel[]): PersonEntity[] {
    const personEntity = person.map<PersonEntity>(item => ({
      fullName: `${item.firstName} ${item.lastName}`,
      email: item.email,
      address: item.address[0].street,
      addressNumber: item.address[0].number,
      phoneNumber: item.contact[0].phoneNumber
    }))

    return personEntity
  }
}
