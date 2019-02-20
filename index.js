const express = require('express')
const bodyParser = require('body-parser')
//generate an id that not repeat
const uuidv4 = require('uuid/v4')

const app = express()
app.use(bodyParser.json())

//Base de datos en memoria
const productos = [
    {id:'1234', titulo:'macbook', precio: 1300, moneda:'USD'},
    {id:'123', titulo:'iphone', precio: 800, moneda:'USD'},
    {id:'12', titulo:'tazas', precio: 50, moneda:'USD'},
]

app.route('/productos')
    .get((req, res) => {
        res.json(productos)
    })
    .post((req,res) => {
        let nuevoProducto = req.body
        if (!nuevoProducto.moneda || !nuevoProducto.precio || !nuevoProducto.titulo) {
            //Bad request
            res.status(404).send(`Tu producto debe especificar un titulo, precio y moenda`)
            return
        }

        nuevoProducto.id = uuidv4();
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    })

app.get('/productos/:id', (req, res) => {
        for(let producto of productos) {
            if(producto.id == req.params.id){
                res.json(producto)
                return
            }
        }
        //Not found
        res.status(404).send(`El producto con id ${req.params.id} no existe`)
    })



app.get('/', (req, res) => {
    res.send('first api get')
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000.')
})