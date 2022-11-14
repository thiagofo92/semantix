import { PersonModel } from '@/app/models/person-model'

export interface PersonContract {
  create: (person: PersonModel) => Promise<boolean>
}
