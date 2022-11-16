import 'dotenv/config'
import { XmlUseCase } from '@/app/use-case/xml-use-case'
import { PersonUseCase } from '@/app/use-case'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { RequestHttps } from '@/infra/services/http/request-https'
import {
  PersonAddressModel,
  PersonContactModel,
  PersonModel,
  PersonWithAddressAndContactModel
} from '@/app/models/person-model'
import { MIN } from '../util/time-milise'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
import { PersonServiceMongo } from '@/infra/services/db/mongo'

void (async () => {
  const requestHttps = new RequestHttps()
  const xmlServices = new XmlToJsonService()
  const personService = new PersonServiceMongo()
  const personUseCase = new PersonUseCase(personService)

  const delay = MIN * 1
  const user = process.env.API_TECH_USER || ''
  const password = process.env.API_TECH_PASSWORD || ''
  const xmlUseCase = new XmlUseCase(requestHttps, xmlServices, user, password)
  const baseUrl = process.env.API_TECH_BASEURL || ''
  const url = `${baseUrl}/users`
  const personModel: PersonWithAddressAndContactModel[] = []
  const usersAddress: PersonAddressModel [] = []
  const usersContact: PersonContactModel [] = []

  const users: PersonModel[] = []
  let page = 1
  let count = 0

  const MongoClient = await MongoConnection()
  while (true) {
    count += 3
    const user = await xmlUseCase.getUsers({ url, limit: '1', page: page.toString() })

    if (user.length <= 0) break

    usersAddress.push(...await xmlUseCase.getAddress(`${url}/${user[0].id}/address`))

    usersContact.push(...await xmlUseCase.getContact(`${url}/${user[0].id}/contacts`))

    users.push(...user)
    if (count >= 29) {
      await sleep(delay)
      count = 0
    }
    page += 1
  }

  users.forEach(user => {
    const address = usersAddress.filter(address => address.userId === user.id)
    const contact = usersContact.filter(contact => contact.userId === user.id)
    const person: PersonWithAddressAndContactModel = {
      ...user,
      contact: [],
      address: []
    }
    if (address) person.address.push(...address)

    if (contact) person.contact.push(...contact)

    personModel.push(person)
  })

  await personUseCase.createMany(personModel)

  await MongoClient.disconnect()
  async function sleep (min: number): Promise<void> {
    return await new Promise((resolve, reject) => setTimeout(_ => resolve(), min))
  }
})()
