import { Users, XmlDataUsersUseCaseContract } from '@/core/contract/xml-contract'
import { DataUsersAddressXmlEntity, DataUsersContactXmlEntity } from '@/core/entities/xml-entity'
import { PersonAddressModel, PersonContactModel, PersonModel } from '../models/person-model'
import { RequestHttpsRepository } from '../repositories/request-https-repository'
import { XmlToJsonRepository } from '../repositories/xml-to-json-repository'

export class XmlUseCase implements XmlDataUsersUseCaseContract {
  private readonly authorization: string
  constructor (
    private readonly requestHttpService: RequestHttpsRepository,
    private readonly xmlToJsonService: XmlToJsonRepository,
    user: string,
    password: string
  ) {
    this.authorization = Buffer.from(`${user}:${password}`).toString('base64')
  }

  async getUsers (user: Users): Promise<PersonModel[]> {
    const options = {
      headers: {
        Authorization: `Basic ${this.authorization}`
      },
      params: {
        pagination: String(user.pagination),
        limit: String(user.limit)
      }
    }

    const result = await this.requestHttpService.get(user.url, options)

    if (result.isLeft()) throw result.value

    const json = await this.xmlToJsonService.execute(result.value.data)

    if (json.isLeft()) throw json.value

    return json.value
  }

  async getAddress (url: string): Promise<PersonAddressModel[]> {
    const options = {
      headers: {
        Authorization: `Basic ${this.authorization}`
      }
    }

    const result = await this.requestHttpService.get(url, options)

    if (result.isLeft()) throw result.value

    const json = await this.xmlToJsonService.execute<DataUsersAddressXmlEntity>(result.value.data)

    if (json.isLeft()) throw json.value

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
  }

  async getContact (url: string): Promise<PersonContactModel[]> {
    const options = {
      headers: {
        Authorization: `Basic ${this.authorization}`
      }
    }
    const result = await this.requestHttpService.get(url, options)

    if (result.isLeft()) throw result.value

    const json = await this.xmlToJsonService.execute<DataUsersContactXmlEntity>(result.value.data)

    if (json.isLeft()) throw json.value

    return json.value.data.item.map(item => ({
      id: item.id[0],
      userId: item.userId[0],
      name: item.name[0],
      phoneNumber: item.phoneNumber[0],
      email: item.email[0]
    }))
  }
}
