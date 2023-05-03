import express from 'express'
import { findUser, createUser } from "./controllers/userController.js"
import { isAuth } from './controllers/authController.js'
import mongoose from './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/register', createUser)
app.post('/login', findUser)

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' })
})

app.get('/register', (req, res) => {
  res.sendFile('register.html', { root: 'public' })
})

app.get('/dashboard', isAuth, (req, res) => {
  res.sendFile('dashboard.html', { root: 'public' })
})

export default app