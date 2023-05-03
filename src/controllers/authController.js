import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const verify = jwt.verify

dotenv.config()

export const isAuth = (req, res, next) => {

  const authorization = req.headers['authorization']

  if (!authorization) {
    return res.status(401).json({ msg: "Token de autorizacion no encontrado." })
  }

  try {
    const token = authorization.split(" ")[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = payload.user
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token invalido." })
  }

  return next()
}