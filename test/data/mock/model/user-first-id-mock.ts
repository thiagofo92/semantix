import {
  PersonAddressModel,
  PersonContactModel,
  PersonModel,
  PersonWithAddressAndContactModel
} from '@/app/models/person-model'

export function userFirstIdWithAddressAndContactMock (): PersonWithAddressAndContactModel {
  return {
    id: '1',
    firstName: 'Nakia',
    lastName: 'Towne',
    email: 'Melissa.Stamm84@hotmail.com',
    avatar: 'https://cdn.fakercloud.com/avatars/al_li_128.jpg',
    contact: [userContactFirstIdMock()],
    address: [userAddressFirstIdMock()],
    createdAt: '2022-02-23T05:20:06.524Z'
  }
}

export function userFirstIdMock (): PersonModel {
  return {
    id: '1',
    firstName: 'Nakia',
    lastName: 'Towne',
    email: 'Melissa.Stamm84@hotmail.com',
    avatar: 'https://cdn.fakercloud.com/avatars/al_li_128.jpg',
    createdAt: '2022-02-23T05:20:06.524Z'
  }
}

export function userAddressFirstIdMock (): PersonAddressModel {
  return {
    id: '1',
    userId: '1',
    street: 'Halvorson Turnpike',
    city: 'Wunschfort',
    state: 'Illinois',
    zipcode: '93067-6844',
    country: 'Gibraltar',
    number: '35',
    countryCode: 'AW'
  }
}

export function userContactFirstIdMock (): PersonContactModel {
  return {
    id: '1',
    userId: '1',
    name: 'Terrell Douglas',
    phoneNumber: '975.331.2264 x128',
    email: 'Taurean84@yahoo.com'
  }
}
