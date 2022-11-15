import {
  DataUsersXmlEntity,
  DataUsersAddressXmlEntity,
  DataUsersContactXmlEntity
} from '../entities/xml-entity'

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
  getUsers: (user: Users) => Promise<DataUsersXmlEntity>
  getAddress: (url: string) => Promise<DataUsersAddressXmlEntity>
  getContact: (url: string) => Promise<DataUsersContactXmlEntity>
}
