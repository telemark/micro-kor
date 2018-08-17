if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Router = require('router')
const finalhandler = require('finalhandler')
const jwt = require('express-jwt')
const handleUnauthorized = require('./lib/handle-unauthorized')
const { secret } = require('./config')
const handler = require('./lib/handler')

const router = Router()

// JWT
router.use(jwt({ secret }).unless({ path: ['/'] }))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handler.getFrontpage)
router.post('/personinfo', handler.getPersonInfo)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
