import { decodeJwt } from '../helpers/jwtHelper.js'

const authorization = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const data = decodeJwt(token)
    req.userName = data.name
    req.userRole = data.role
    return next()
  } catch (error) {
    console.error('error decoding token', error)
    return res.send(401)
  }
}

export default authorization
