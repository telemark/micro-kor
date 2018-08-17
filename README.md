[![Build Status](https://travis-ci.org/telemark/micro-kor.svg?branch=master)](https://travis-ci.org/telemark/micro-kor)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-kor

micro rest api for kontakt- og reservasjonsregisteret

Retrives token from difi with [server-to-server-oauth2](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html)

## API

### POST ```/personInfo```

**Request**

A array with one or more personal ids.

```json
["26118642424"]
```

**Response**

```js
{
  personer: [
    {
      personidentifikator: "26118642424",
      reservasjon: "NEI",
      status: "AKTIV",
      kontaktinformasjon: {
        epostadresse: "jonas.enge@gmail.com",
        epostadresse_oppdatert: "2014-03-20T10:44:39+01",
        epostadresse_sist_verifisert: "2018-07-31T23:19:02+02",
        mobiltelefonnummer: "41514965",
        mobiltelefonnummer_oppdatert: "2014-03-20T10:44:39+01",
        mobiltelefonnummer_sist_verifisert: "2018-07-31T23:19:02+02"
      }
    }
  ]
}
```

## Call webservice with curl

```bash
curl -k -X POST \
-H "Authorization: <INSERT-TOKEN>" \
-d '['26118642424']' \
http://localhost:3000/personInfo
```

## Run with docker

```bash
docker run -d \
  -p 3000:3000 \
  -E docker.env \
  --name micro-kor \
  telemark/micro-kor
 ```
