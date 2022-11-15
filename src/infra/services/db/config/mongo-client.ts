import { MongoConnectionError } from '@/infra/error'
import mongoose from 'mongoose'

const dbName = process.env.DB_NAME || ''
const dbHost = process.env.DB_HOST || ''
const dbPort = process.env.DB_PORT || '27017'
const dbUser = process.env.DB_USER || ''
const dbPassword = process.env.DB_PASSWORD || ''

let MongoClient: null | typeof mongoose = null

export async function MongoConnection (): Promise<typeof mongoose> {
  try {
    if (MongoClient) return MongoClient
    console.log(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`)

    MongoClient = await mongoose
      .connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`, {
        dbName
      })

    return MongoClient
  } catch (error: any) {
    throw new MongoConnectionError(error.message)
  }
}
