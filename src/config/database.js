import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DB_URI

mongoose.connect(
  uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)

mongoose.connection.on('error', console.error.bind(console, 'Error al conectarse con la base de datos.'))

mongoose.connection.once('open', () => {
  console.log('Conexión con la base de datos iniciada.')
})

export default mongoose

