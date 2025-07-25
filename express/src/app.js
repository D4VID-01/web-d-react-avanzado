// 1. Importar Express

// *Con CommonJS
/* const express = require('express')
require('dotenv').config() */

// *Con ESModules
import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

// 2. Crear la aplicación de Express
const app = express()
const PORT = process.env.PORT

// Función que lee la información del archivo "db.json"
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
/* console.log(readData()) */

// Función que escribe dentro de "db.json"
const writeData = data => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

// Métodos GET
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  res.json(data)
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  res.json(result)
})

// Métodos POST
app.use(express.json())

app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }
  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})

// Métodos PUT
app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }
  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

// Métodos DELETE
app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion.splice(peliculaIndex, 1)
  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})

app.listen(PORT, () => {
  console.log(`Corriendo servidor desde el puerto ${PORT}`)
})
