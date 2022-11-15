import { PersonWithAddressAndContactModel } from '@/app/models/person-model'
import { PersonPresenterModel } from '@/app/presenters/model'

export interface PersonContract {
  createOne: (person: PersonWithAddressAndContactModel) => Promise<boolean>
  createMany: (person: PersonWithAddressAndContactModel[]) => Promise<boolean>
  findAll: () => Promise<PersonPresenterModel[]>
}
