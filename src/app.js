import express from 'express'
import { findUser, createUser } from "./controllers/userController.js"
import { isAuth, logout } from './controllers/authController.js'
import cookieParser from 'cookie-parser'
import mongoose from './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', './src/views/')

app.post('/register', createUser)
app.post('/login', findUser)
app.get('/logout', logout)

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/dashboard', isAuth, (req, res) => {
  res.render('index', { user: req.user })
})

export default app