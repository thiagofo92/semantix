interface XmlFile<T> {
  data: { [key in keyof T]: T[key] }
}

interface XmlPagination {
  pagination: { page: { _: '1', '$': Object[] }, limit: { _: string, '$': Object[] } }
}

interface XmlUsers {
  usersList: {
    '$': { type: string }
    item: Array<{
      createdAt: string
      firstName: string
      avatar: string
      email: string
      lastName: string
      id: string
    }>
  }
}

export type DataUsersXmlEntity = XmlFile<XmlPagination & XmlUsers>
