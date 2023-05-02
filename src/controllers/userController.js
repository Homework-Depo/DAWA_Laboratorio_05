import User from '../models/user.js'
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const user = new User({ username, email, password })

    await user.save()
    res.json(user)
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
        res.json('Usuario validado!');
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