import express from 'express'
import db from "./config/database.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app;