import { ResponseModel } from '../presenters/model/response-model'

export function success (data: any): ResponseModel {
  return {
    statusCode: 200,
    data
  }
}

export function successToCreate (data: any): ResponseModel {
  return {
    statusCode: 201,
    data
  }
}

export function notFound (data: any): ResponseModel {
  return {
    statusCode: 204,
    data
  }
}

export function badRequest (data: any): ResponseModel {
  return {
    statusCode: 400,
    data
  }
}

export function notAuthorized (data: any): ResponseModel {
  return {
    statusCode: 401,
    data
  }
}

export function internalError (data: any): ResponseModel {
  return {
    statusCode: 500,
    data
  }
}
