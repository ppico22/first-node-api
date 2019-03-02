const express = require('express')
const bodyParser = require('body-parser')
const productosRouter = require('./api/recursos/productos/productos.routes')

const app = express()
app.use(bodyParser.json())

app.use('/productos', productosRouter)

app.get('/', (req, res) => {
    res.send('first api get')
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000.')
})