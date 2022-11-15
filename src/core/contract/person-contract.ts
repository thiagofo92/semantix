import { PersonWithAddressAndContactModel } from '@/app/models/person-model'

export interface PersonContract {
  create: (person: PersonWithAddressAndContactModel) => Promise<boolean>
}
