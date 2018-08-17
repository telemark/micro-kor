const fs = require('fs').promises
const md = require('markdown-it')()
const korClient = require('kor-client')
const { json, send } = require('micro')
const logger = require('./logger')
const config = require('../config')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await fs.readFile('./README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getPersonInfo = async (request, response) => {
  const userPayload = await json(request)
  console.log(userPayload)
  if (!Array.isArray(userPayload)) {
    const error = new Error('Payload must be array')
    logger('error', ['handlers', 'getPersonInfo', error])
    send(response, 500, error)
  }
  logger('info', ['handlers', 'getPersonInfo'])
  const clientOptions = {
    url: config.url,
    cert: config.cert,
    privateKey: config.privateKey,
    privateKeyPassphrase: config.privateKeyPassphrase,
    issuer: config.issuer,
    scope: config.scope
  }

  try {
    const client = await korClient(clientOptions)
    const { token: { access_token: token } } = client.getConfig()
    logger('info', ['handlers', 'getPersonInfo', 'got token'])
    const payload = { personidentifikatorer: userPayload }
    const data = await client.getData({ url: clientOptions.url + 'kontaktinfo-oauth2-server/rest/v1/personer', token, payload })
    logger('info', ['handlers', 'getPersonInfo', 'got data'])
    send(response, 200, data)
  } catch (error) {
    logger('error', ['handlers', 'getPersonInfo', error])
    send(response, 500, error)
  }
}
