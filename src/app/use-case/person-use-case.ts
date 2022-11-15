import { PersonEntity } from '@/core/entities/person-entity'
import { PersonService } from '@/infra/services/db/memory'
import { PersonWithAddressAndContactModel } from '@/app/models/person-model'
import { PersonContract } from '@/core/contract/person-contract'

export class PersonUseCase implements PersonContract {
  constructor (private readonly personService: PersonService) {}

  async create (person: PersonWithAddressAndContactModel): Promise<boolean> {
    const personEntity = this.toPersonEntity(person)
    const result = await this.personService.create(personEntity)

    if (result.isLeft()) return false

    return true
  }

  private toPersonEntity (person: PersonWithAddressAndContactModel): PersonEntity {
    const personEntity: PersonEntity = {
      fullName: '',
      email: '',
      address: '',
      addressNumber: '',
      phoneNumber: ''
    }
    const indexContact = this.findFisrtId(person.contact)
    const indexAddress = this.findFisrtId(person.address)

    personEntity.fullName = `${person.firstName} ${person.lastName}`
    personEntity.email = person.email
    personEntity.address = person.address[indexAddress].street
    personEntity.addressNumber = person.address[indexAddress].number
    personEntity.phoneNumber = person.contact[indexContact].phoneNumber

    return personEntity
  }

  private findFisrtId (value: Array<Pick<{ id: string }, 'id'>>): number {
    let indexAddress = -1
    let currentlyId = 0
    const { length } = value

    for (let i = 0; i < length; i++) {
      const { id } = value[i]
      if (currentlyId < Number(id)) {
        indexAddress = i
        currentlyId = Number(id)
      }
    }

    return indexAddress
  }

  private toPersonEntityArray (person: PersonWithAddressAndContactModel[]): PersonEntity[] {
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
