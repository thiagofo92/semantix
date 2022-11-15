export interface PersonWithAddressAndContactModel {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  contact: PersonContactModel[]
  address: PersonAddressModel[]
  createdAt: string
}

export interface PersonModel {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  createdAt: string
}

export interface PersonContactModel {
  id: string
  userId: string
  name: string
  phoneNumber: string
  email: string
}

export interface PersonAddressModel {
  id: string
  userId: string
  street: string
  city: string
  state: string
  zipcode: string
  country: string
  number: string
  countryCode: string
}
