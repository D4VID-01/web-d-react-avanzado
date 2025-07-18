// LLamar al módulo
const http = require('http')

// Creación del server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hola mundo desde Node.js ')
})

const PORT = 3000

// Ejecutar con el método listen
server.listen(PORT, () => {
  console.log('Servidor ejecutandose en el puerto http://localhost:3000')
})
