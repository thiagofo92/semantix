import RateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import { MIN } from '../util/time-milise'

const rateLimit: RateLimitRequestHandler = RateLimit({
  windowMs: MIN * 1,
  max: 25,
  headers: true
})

export { rateLimit }
