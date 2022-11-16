import FileUpLoad from 'express-fileupload'
import { join } from 'path'

const path = join(__dirname, '..', '..', '..', 'tmp')
const megaBytes = 1024 * 1024

export const fileUpLoad = FileUpLoad({
  limits: {
    fileSize: megaBytes * 10
  },
  useTempFiles: true,
  tempFileDir: path,
  parseNested: true
})
