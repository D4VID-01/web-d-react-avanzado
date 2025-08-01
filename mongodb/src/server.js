import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Hola Atlas")
})

//conect() pide una uri o una llave que conecte a la base de datos
//la llave se guarda en un archivo .env y se importa con dotenv
mongoose
.connect(process.env.MONGODB_KEY)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((error) => console.error("Error al conectar a MongoDB Atlas:", error))

app.listen(PORT, () => {
  console.log("Aplicación corriendo en puerto",PORT)
})