/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ExpressAdapter } from '../adapter'
import { factoryFileController, factoryFolderController } from '../factories/controllers'

export class Routers {
  constructor (private readonly router: Router) {}

  private test (): void {
    this.router.get('/test', (req, res) => {
      res.send('ok')
    })
  }

  private folder (): void {
    const controller = factoryFolderController()
    this.router.post('/folder/create', ExpressAdapter(controller.create))
  }

  private file (): void {
    const controller = factoryFileController()
    this.router.post('/file/create', ExpressAdapter(controller.create))
    this.router.delete('/file/delete', ExpressAdapter(controller.create))
  }

  build (): Router {
    this.test()
    this.folder()
    this.file()

    return this.router
  }
}
