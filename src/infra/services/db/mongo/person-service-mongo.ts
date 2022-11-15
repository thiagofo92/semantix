import { PersonRepository } from '@/app/repositories'
import { PersonEntity } from '@/core/entities/person-entity'
import { PersonCreateError } from '@/app/errors'
import { Either } from '@/shared/error/Either'

export class PersonServiceMongo implements PersonRepository {
  create: (person: PersonEntity) => Promise<Either<PersonCreateError, boolean>>
}
