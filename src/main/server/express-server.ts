import Express from 'express'
import { Routers } from '../routes/routers'
import configMiddleware from '../middlewares/config'

const app = Express()

const host = '0.0.0.0'
const port = 4500
const router = Express.Router()
const routers = new Routers(router)
router.use('/api', routers.build())
router.use(configMiddleware)
app.use(router)
app.listen(port, host, () => {
  console.log(`Server is on ${host}:${port}`)
})
