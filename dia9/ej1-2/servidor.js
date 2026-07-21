const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.write('Hola bro!')
  res.end()
})

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})