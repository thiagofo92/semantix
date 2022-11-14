import { PersonModel } from '@/app/models/person-model'

export interface PersonUseCaseContract {
  create: (person: PersonModel) => Promise<boolean>
}
