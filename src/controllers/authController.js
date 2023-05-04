import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const verify = jwt.verify

dotenv.config()

export const isAuth = (req, res, next) => {
  
  //const authorization = req.headers['authorization']
  const token = req.cookies.jwt_token

  if (!token) {
    res.redirect('/login').status(401)
  }

  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = payload.user
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token invalido." })
  }

  return next()
}

export const logout = (req, res) => {

  const token = req.cookies.jwt_token

  if (!token) {
    return res.redirect('./login')
  }

  res.clearCookie('jwt_token')
  res.redirect('./login')
}