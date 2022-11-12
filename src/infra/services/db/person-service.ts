import { PersonCreateError } from "@/core/errors/person-error";
import { PersonRepository } from "@/core/repositories/person-repository";
import { Either, left, right } from "@/shared/error/Either";

export class PersonServices implements PersonRepository { 
  async create(person: PersonEntity): Promise<Either<PersonCreateError, boolean>> {
    try {
      return right(true)
    } catch (error: any) {
      return left(new PersonCreateError(error.message)) ;
    }   
  }
}