import jwt from 'jsonwebtoken'

export const encodeJwt = payload => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '7d'
  })
}

export const decodeJwt = token => {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}
