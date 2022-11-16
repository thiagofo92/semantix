import mongoose from 'mongoose'

const { Schema, model } = mongoose

const files = new Schema({
  id: Schema.Types.ObjectId,
  id_file: {
    type: String,
    require: true
  },
  id_folder: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

export const FileModel = model('files', files)
