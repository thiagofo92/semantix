interface XmlFile<T> {
  data: {
    [key in keyof T]: T[key]
  }
}

interface XmlPagination {
  pagination: { page: { _: [string], '$': Object[] }, limit: { _: [string], '$': Object[] } }
}

interface UsersXmlEntity {
  usersList: [{
    '$': { type: [string] }
    item: Array<{
      createdAt: [string]
      firstName: [string]
      avatar: [string]
      email: [string]
      lastName: [string]
      id: [string]
    }>
  }]
}

interface UserAddressXmlEntity {
  '$': { type: [string] }
  item: Array<{
    id: [string]
    userId: [string]
    street: [string]
    city: [string]
    state: [string]
    zipcode: [string]
    country: [string]
    number: [{ '_': string, '$': { type: string } }]
    countryCode: [string]
  }>
}

interface UsersContactXmlEntity {
  '$': { type: string }
  item: Array<{
    id: [string]
    userId: [string]
    name: [string]
    phoneNumber: [string]
    email: [string]
  }>
}

export type DataUsersXmlEntity = XmlFile<XmlPagination & UsersXmlEntity>
export type DataUsersAddressXmlEntity = XmlFile<UserAddressXmlEntity>
export type DataUsersContactXmlEntity = XmlFile<UsersContactXmlEntity>
