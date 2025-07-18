// LLamar al módulo
const express = require('express')

// Creación de la aplicación express
const app = express()

// Definimos el puerto  que va escuchar el servidor
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
