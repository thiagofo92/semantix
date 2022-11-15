import { PersonRepository } from '@/app/repositories'
import { PersonEntity } from '@/core/entities/person-entity'
import { PersonCreateError, PersonFindAllError } from '@/app/errors'
import { Either, left, right } from '@/shared/error/Either'
import { PersonModel } from './schema'

export class PersonServiceMongo implements PersonRepository {
  async createOne (person: PersonEntity): Promise<Either<PersonCreateError, boolean>> {
    try {
      await PersonModel.create({
        ...person
      })

      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }

  async createMany (person: PersonEntity[]): Promise<Either<PersonCreateError, boolean>> {
    try {
      await PersonModel.insertMany(person)

      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message))
    }
  }

  async findAll (): Promise<Either<PersonFindAllError, PersonEntity[]>> {
    try {
      const result = await PersonModel.find()

      const personEntity = result.map(item => ({
        id: item._id.toString(),
        address: item.address,
        addressNumber: item.addressNumber,
        email: item.email,
        fullName: item.fullName,
        phoneNumber: item.phoneNumber
      }))

      return right(personEntity)
    } catch (error: any) {
      return left(new PersonFindAllError(error.message))
    }
  }
}
