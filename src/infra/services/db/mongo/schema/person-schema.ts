import mongoose from 'mongoose'

const { Schema, model } = mongoose

const users = new Schema({
  id: Schema.Types.ObjectId,
  fullName: String,
  email: String,
  address: String,
  addressNumber: String,
  phoneNumber: String
})

export const UsersModel = model('users', users)
