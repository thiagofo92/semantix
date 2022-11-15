import mongoose from 'mongoose'

const { Schema, model } = mongoose

const users = new Schema({
  id: Schema.Types.ObjectId,
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  addressNumber: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
})

export const PersonModel = model('users', users)
