import {
  PersonModel,
  PersonAddressModel,
  PersonContactModel
} from '@/app/models/person-model'

export interface Login {
  user: string
  password: string
}

export interface UsersRequestParams {
  url: string
  page: string
  limit: string
}

export interface DataUseCaseContract {
  getUsers: (user: UsersRequestParams) => Promise<PersonModel[]>
  getAddress: (url: string) => Promise<PersonAddressModel[]>
  getContact: (url: string) => Promise<PersonContactModel[]>
}
