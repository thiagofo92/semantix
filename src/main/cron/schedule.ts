import 'dotenv/config'
import { XmlUseCase } from '@/app/use-case/xml-use-case'
import { PersonUseCase } from '@/app/use-case'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { PersonService } from '@/infra/services/db/memory'
import { RequestHttps } from '@/infra/services/http/request-https'
import { PersonAddressModel, PersonContactModel, PersonModel } from '@/app/models/person-model'
import { SEC } from '../util/time-milise'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'

void (async () => {
  const requestHttps = new RequestHttps()
  const xmlServices = new XmlToJsonService()
  const personService = new PersonService()
  const personUseCase = new PersonUseCase(personService)

  const delay = SEC * 3
  const user = process.env.API_TECH_USER || ''
  const password = process.env.API_TECH_PASSWORD || ''
  const xmlUseCase = new XmlUseCase(requestHttps, xmlServices, user, password)
  const baseUrl = process.env.API_TECH_BASEURL || ''
  const url = `${baseUrl}/users`
  // const personModel: PersonWithAddressAndContactModel[] = []
  const usersAddress: PersonAddressModel [] = []
  const usersContact: PersonContactModel [] = []
  const count = 1
  const users: PersonModel[] = []

  const MongoClient = await MongoConnection()

  while (true) {
    const tmp = await xmlUseCase.getUsers({ url, limit: '10', page: count.toString() })

    if (tmp.length <= 0) break
    users.push(...tmp)
  }

  const { length } = users

  for (let i = 0; i < length; i++) {
    const { id } = users[i]
    usersAddress.push(...await xmlUseCase.getAddress(`${url}/${id}/address`))
    await sleep(delay)
    usersContact.push(...await xmlUseCase.getContact(`${url}/${id}/contacts`))
    await sleep(delay)
  }

  console.log(users)
  console.log(usersAddress)
  console.log(usersContact)

  await MongoClient.disconnect()
  async function sleep (min: number): Promise<void> {
    return await new Promise((resolve, reject) => setTimeout(_ => resolve(), min))
  }
})()
