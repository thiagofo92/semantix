import { Either } from '@/shared/error/Either'
import { PersonEntity } from '../../core/entities/person-entity'
import { PersonCreateError, PersonFindAllError } from '../errors/person-error'

export interface PersonRepository {
  createOne: (person: PersonEntity) => Promise<Either<PersonCreateError, boolean>>
  createMany: (person: PersonEntity[]) => Promise<Either<PersonCreateError, boolean>>
  findAll: () => Promise<Either<PersonFindAllError, PersonEntity[]>>
}
