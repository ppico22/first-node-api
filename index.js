const express = require('express')
const bodyParser = require('body-parser')
//generate an id that not repeat
const uuidv4 = require('uuid/v4')
const _ = require('underscore')

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
            res.status(404).send(`Tu producto debe especificar un titulo, precio y moneda`)
            return
        }

        nuevoProducto.id = uuidv4();
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    })

app.route('/productos/:id')
    .get((req, res) => {
            for(let producto of productos) {
                if(producto.id == req.params.id){
                    res.json(producto)
                    return
                }
            }
            //Not found
            res.status(404).send(`El producto con id ${req.params.id} no existe`)
        })
    .put((req, res) => {
        let id = req.params.id
        let reemplazoParaProducto = req.body

        if (!reemplazoParaProducto.moneda || !reemplazoParaProducto.precio || !reemplazoParaProducto.titulo) {
            //Bad request
            res.status(400).send(`Tu producto debe especificar un titulo, precio y moneda`)
            return
        }

        let indice = _.findIndex(productos, producto => producto.id == id)
        
        if(indice !== -1){
            reemplazoParaProducto.id = id
            productos[indice] = reemplazoParaProducto
            res.status(200).json(reemplazoParaProducto)
        }else{
            res.status(404).send(`El producto con id ${id} no existe`)
        }
    }) 
    .delete((req, res) => {
        let indiceABorrar = _.findIndex(productos, producto => producto.id == req.params.id)
        if(indiceABorrar === -1){
            res.status(404).send(`Producto con id [${req.params.id}] no existe. Nada que borrar.`)
            return
        }
        let borrado = productos.splice(indiceABorrar, 1)
        res.json(borrado)
    })

app.get('/', (req, res) => {
    res.send('first api get')
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000.')
})