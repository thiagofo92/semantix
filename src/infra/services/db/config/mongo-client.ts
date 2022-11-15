import { MongoConnectionError } from '@/infra/error'
import mongoose from 'mongoose'

const dbName = process.env.DB_NAME || ''
const dbHost = process.env.DB_HOST || ''
const dbPort = process.env.DB_PORT || ''
const dbUser = process.env.DB_USER || ''
const dbPassword = process.env.DB_PASSWORD || ''

let MongoClient: null | typeof mongoose = null

export async function MongoConnection (): Promise<any> {
  try {
    if (MongoClient) return MongoClient

    MongoClient = await mongoose
      .connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority`)

    return MongoClient
  } catch (error: any) {
    throw new MongoConnectionError(error.message)
  }
}
