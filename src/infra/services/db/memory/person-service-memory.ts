import { PersonEntity } from '@/core/entities/person-entity'
import { PersonCreateError } from '@/core/errors/person-error'
import { PersonRepository } from '@/core/repositories/person-repository'
import { Either, left, right } from '@/shared/error/Either'

export class PersonService implements PersonRepository {
  private readonly person: PersonEntity[] = []
  async create (person: PersonEntity): Promise<Either<PersonCreateError, boolean>> {
    try {
      this.person.push(person)
      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }
}
