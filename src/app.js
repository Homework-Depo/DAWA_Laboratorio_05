import express from 'express'
import { findUser, createUser } from "./controllers/userController.js"
import { isAuth } from './controllers/authController.js'
import mongoose from './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/register', createUser)
app.post('/login', findUser)

app.get('/login', (req, res) => {
  // redirect to login page
})

app.get('/register', (req, res) => {
  // redirect to register page
})

app.get('/dashboard', isAuth, (req, res) => {
  res.json(req.user)
  // redirect to dashboard
})

export default app