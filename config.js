const { readFileSync } = require('fs')

module.exports = {
  secret: process.env.KOR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  url: process.env.KOR_URL || 'https://oidc-ver1.difi.no/',
  cert: process.env.KOR_CERT ? Buffer.from(process.env.KOR_CERT, 'base64').toString() : readFileSync('./data/public.pem', 'utf-8'),
  privateKey: process.env.KOR_PRIVATE_KEY ? Buffer.from(process.env.KOR_PRIVATE_KEY, 'base64').toString() : readFileSync('./data/private.key', 'utf-8'),
  privateKeyPassphrase: process.env.KOR_PRIVATE_KEY_PASSPHRASE || undefined,
  issuer: process.env.KOR_ISSUER || 'Din-id',
  scope: process.env.KOR_SCOPE || 'global/kontaktinformasjon.read'
}
