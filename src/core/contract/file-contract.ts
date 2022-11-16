import { FileUploadModel } from '@/app/models/file-model'
import { ResponseModel } from '@/app/presenters/model/response-model'

export interface FileUseCaseContract {
  create: (fileUpload: FileUploadModel) => Promise<ResponseModel>
  del: (name: string) => Promise<ResponseModel>
}
