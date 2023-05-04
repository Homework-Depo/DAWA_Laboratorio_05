import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const user = new User({ username, email, password })

    await user.save()

    const token = jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    )

    res.cookie('jwt_token', token, { httpOnly: true, secure: true })

    res.redirect('./dashboard')

  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

export const findUser = async (req, res) => {

  try {

    const { username, password } = req.body
    const user = await User.findOne({
      username: username
    })

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.passwordHash)

      if (isValidPassword) {

        const token = jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        )

        res.cookie('jwt_token', token, { httpOnly: true, secure: true })

        res.redirect('/dashboard')

      } else {
        res.json('Contraseña incorrecta!')
      }

    } else {
      res.json("User not found!")
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}