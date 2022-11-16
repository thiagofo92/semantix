import { UsersRequestParams, DataUseCaseContract } from '@/core/contract/data-contract'
import {
  DataUsersAddressXmlEntity,
  DataUsersContactXmlEntity,
  DataUsersXmlEntity
} from '@/core/entities/xml-entity'
import { PersonAddressModel, PersonContactModel, PersonModel } from '../models/person-model'
import { RequestHttpsRepository } from '../repositories/request-https-repository'
import { XmlToJsonRepository } from '../repositories/xml-to-json-repository'

export class XmlUseCase implements DataUseCaseContract {
  private readonly authorization: string
  constructor (
    private readonly requestHttpService: RequestHttpsRepository,
    private readonly xmlToJsonService: XmlToJsonRepository,
    user: string,
    password: string
  ) {
    this.authorization = Buffer.from(`${user}:${password}`).toString('base64')
  }

  async getUsers (user: UsersRequestParams): Promise<PersonModel[]> {
    const options = {
      headers: {
        Authorization: `Basic ${this.authorization}`
      },
      params: {
        page: String(user.page),
        limit: String(user.limit)
      }
    }

    const result = await this.requestHttpService.get(user.url, options)

    if (result.isLeft()) throw result.value

    const json = await this.xmlToJsonService.execute<DataUsersXmlEntity>(result.value.data)

    if (json.isLeft()) throw json.value

    if (!json.value.data.usersList[0].item) return []

    const users = json.value.data.usersList[0].item.map(user => ({
      id: user.id[0],
      firstName: user.firstName[0],
      lastName: user.lastName[0],
      email: user.email[0],
      avatar: user.avatar[0],
      createdAt: user.createdAt[0]
    }))
    return users
  }

  async getAddress (url: string): Promise<PersonAddressModel[]> {
    try {
      const options = {
        headers: {
          Authorization: `Basic ${this.authorization}`
        }
      }

      const result = await this.requestHttpService.get(url, options)

      if (result.isLeft()) {
        console.log(url)

        throw result.value
      }

      const json = await this.xmlToJsonService.execute<DataUsersAddressXmlEntity>(result.value.data)

      if (json.isLeft()) throw json.value

      if (!json.value.data.item || json.value.data.item.length <= 0) return []
      return json.value.data.item.map(item => ({
        id: item.id[0],
        userId: item.userId[0],
        street: item.street[0],
        city: item.city[0],
        state: item.state[0],
        zipcode: item.zipcode[0],
        country: item.country[0],
        number: item.number[0]['_'],
        countryCode: item.countryCode[0]
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async getContact (url: string): Promise<PersonContactModel[]> {
    try {
      const options = {
        headers: {
          Authorization: `Basic ${this.authorization}`
        }
      }
      const result = await this.requestHttpService.get(url, options)

      if (result.isLeft()) {
        console.log(url)

        throw result.value
      }

      const json = await this.xmlToJsonService.execute<DataUsersContactXmlEntity>(result.value.data)

      if (json.isLeft()) throw json.value

      if (!json.value.data.item || json.value?.data?.item?.length <= 0) return []

      return json.value.data.item.map(item => ({
        id: item.id[0],
        userId: item.userId[0],
        name: item.name[0],
        phoneNumber: item.phoneNumber[0],
        email: item.email[0]
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
