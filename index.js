const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
    res.send('first api get')
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000.')
})