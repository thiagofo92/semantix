import { PersonEntity } from '@/core/entities/person-entity'
import { PersonCreateError, PersonFindAllError } from '@/app/errors/person-error'
import { PersonRepository } from '@/app/repositories/person-repository'
import { Either, left, right } from '@/shared/error/Either'

export class PersonService implements PersonRepository {
  async createMany (person: PersonEntity[]): Promise<Either<PersonCreateError, boolean>> {
    try {
      this.person.push(...person)
      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }

  async findAll (): Promise<Either<PersonFindAllError, PersonEntity[]>> {
    try {
      return right(this.person)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }

  private readonly person: PersonEntity[] = []
  async createOne (person: PersonEntity): Promise<Either<PersonCreateError, boolean>> {
    try {
      this.person.push(person)
      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }
}
