import { PersonEntity } from '@/core/entities/person-entity'
import { faker } from '@faker-js/faker'

export function personEntityMock (): PersonEntity {
  return {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    address: faker.address.street(),
    addressNumber: faker.address.buildingNumber(),
    phoneNumber: faker.phone.number()
  }
}

export function personEntityArrayMock (): PersonEntity[] {
  const personEntity: PersonEntity[] = []

  for (let i = 0; i < 5; i++) {
    personEntity.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      address: faker.address.street(),
      addressNumber: faker.address.buildingNumber(),
      phoneNumber: faker.phone.number()
    })
  }
  return personEntity
}
