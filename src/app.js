import express from 'express'
import jwt from 'jsonwebtoken'
import { findUser, createUser } from "./controllers/userController.js"
import mongoose from './config/database.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/register', createUser)
app.post('/login', findUser)

app.get('/register', (req, res) => {
})

export default app;