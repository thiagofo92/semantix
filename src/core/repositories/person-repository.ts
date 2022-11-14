import { Either } from '@/shared/error/Either'
import { PersonEntity } from '../entities/person-entity'
import { PersonCreateError } from '../errors/person-error'

export interface PersonRepository {
  create: (person: PersonEntity) => Promise<Either<PersonCreateError, boolean>>
}
