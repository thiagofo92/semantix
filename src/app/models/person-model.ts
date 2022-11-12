export interface PersonModel {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  contact: PersonContactModel[]
  address: PersonAddressModel[]
  createdAt: string
}

export interface PersonContactModel {
  id: number
  userId: number
  name: string
  phoneNumber: string
  email: string
}

export interface PersonAddressModel {
  id: number
  userId: number
  street: string
  city: string
  state: string
  zipcode: string
  country: string
  number: string
  countryCode: string
}
