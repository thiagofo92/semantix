import { PersonRepository } from '@/app/repositories'
import { PersonEntity } from '@/core/entities/person-entity'
import { PersonCreateError, PersonFindAllError } from '@/app/errors'
import { Either, left, right } from '@/shared/error/Either'

export class PersonServiceMongo implements PersonRepository {
  async create (person: PersonEntity): Promise<Either<PersonCreateError, boolean>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }

  async findAll (): Promise<Either<PersonFindAllError, PersonEntity[]>> {
    try {
      return right([])
    } catch (error: any) {
      return left(new PersonFindAllError(error.message))
    }
  }
}
