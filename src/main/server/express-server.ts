import 'dotenv/config'
import Express from 'express'
import { Routers } from '../routes/routers'
import configMiddleware from '../middlewares/config'
import { MongoConnection } from '@/infra/services/db/config/mongo-client'
void (async () => {
  try {
    await MongoConnection()
    const app = Express()
    const host = '0.0.0.0'
    const port = 4500
    const router = Express.Router()
    router.use(Express.json())
    router.use(configMiddleware)

    const routers = new Routers(router)
    router.use('/api', routers.build())
    app.use(router)
    app.listen(port, host, () => {
      console.log(`Server is on ${host}:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
})()
