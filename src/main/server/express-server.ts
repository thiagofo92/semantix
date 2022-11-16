import Express from 'express'
import { Routers } from '../routes/routers'

const app = Express()

const host = '0.0.0.0'
const port = 4500
const route = Express.Router()
const routers = new Routers(route)
route.use('/api', routers.build())

app.listen(port, host, () => {
  console.log(`Server is on ${host}:${port}`)
})
