import mongoose from 'mongoose'

const { Schema, model } = mongoose

const folders = new Schema({
  id: Schema.Types.ObjectId,
  id_folder: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

export const FolderModel = model('folders', folders)
