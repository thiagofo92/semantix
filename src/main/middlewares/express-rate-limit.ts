import RateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

const rateLimit: RateLimitRequestHandler = RateLimit({
  windowMs: 1 * 50 * 1000,
  max: 25,
  headers: false
})

export { rateLimit }
