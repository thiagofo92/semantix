import 'dotenv/config'
import { PersonUseCase } from '@/app/use-case'
import { XmlUseCase } from '@/app/use-case/xml-use-case'
import { XmlToJsonService } from '@/infra/services/convert/xml-to-json'
import { PersonService } from '@/infra/services/db/memory'
import { RequestHttps } from '@/infra/services/http/request-https'

void (async () => {
  const requestHttps = new RequestHttps()
  const xmlServices = new XmlToJsonService()
  const personService = new PersonService()
  const personUseCase = new PersonUseCase(personService)

  const user = process.env.API_TECH_USER || ''
  const password = process.env.API_TECH_PASSWORD || ''
  const xmlUseCase = new XmlUseCase(requestHttps, xmlServices, user, password)
  const baseUrl = process.env.API_TECH_BASEURL || ''
  const url = `${baseUrl}/users`

  const users = await xmlUseCase.getUsers({ url, page: '10', limit: '10' })
  console.log(users)
})()
