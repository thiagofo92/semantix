import Multer from 'multer'
const megaBytes = 1024 * 1024
const storage = Multer.memoryStorage()
export const multerMiddleware = Multer({
  limits: {
    fileSize: megaBytes * 10
  },
  storage
})
