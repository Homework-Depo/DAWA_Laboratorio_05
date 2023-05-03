import express from 'express'
import jwt from 'jsonwebtoken'
import { findUser, createUser } from "./controllers/userController.js"
import { isAuth } from './controllers/authController.js'
import mongoose from './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/register', createUser)
app.post('/login', findUser)

app.get('/register', (req, res) => {
})

app.get('/dashboard', isAuth, (req, res) => {
  res.json("Hola")
})

export default app