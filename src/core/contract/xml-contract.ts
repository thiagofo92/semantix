import {
  PersonModel,
  PersonAddressModel,
  PersonContactModel
} from '@/app/models/person-model'

export interface Login {
  user: string
  password: string
}

export interface Users {
  url: string
  pagination: string
  limit: string
}

export interface XmlDataUsersUseCaseContract {
  getUsers: (user: Users) => Promise<PersonModel>
  getAddress: (url: string) => Promise<PersonAddressModel>
  getContact: (url: string) => Promise<PersonContactModel>
}
