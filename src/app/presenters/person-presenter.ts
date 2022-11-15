import { PersonEntity } from '@/core/entities/person-entity'
import { PersonPresenterModel } from './model'

export const PersonPresenter = {
  toPresenter (person: PersonEntity): PersonPresenterModel {
    return {
      id: person.id!,
      fullName: person.fullName,
      address: person.address,
      addressNumber: person.addressNumber,
      email: person.email,
      phoneNumber: person.phoneNumber
    }
  }
}
