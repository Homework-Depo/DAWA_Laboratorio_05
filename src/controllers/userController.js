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

    res.json({
      data: [
        {
          user: user
        }
      ]
    })

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
          {
            user: { username: user.username, email: user.email }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        )

        res.json({
          data:
          {
            user: user,
            JWT_TOKEN: token
          }
        })

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