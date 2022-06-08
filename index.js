const express = require('express')
const app = express()
const port = 80
var { obtenerDatoTarjeta } = require('./lib')

app.get('/api/tarjeta', (req, res) => {
  if (req.query.codigo) {
    obtenerDatoTarjeta(req.query.codigo).then((datos) => {
      console.log(datos)
      res.json(datos)
    }).then((error) => {
      res.json(error)
    })
  } else {
    res.json({ error: "Error desconocido" })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})