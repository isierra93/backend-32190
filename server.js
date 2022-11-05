const express = require('express');
const app = express();
const PORT = 8080;
const fs = require(`fs`)

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT} .`)
})

server.on(`error`, (error)=>{
    console.log(`Hubo un error: ${error}.`)
})

async function getById(index) {
    try {
        const productos = await fs.promises.readFile(`productos.txt`, `utf-8`);
        let listProducts = JSON.parse(productos);
        const resultado = listProducts.filter(producto => producto.id == index)

        if (resultado.length === 0) {
            return null
        }
        return resultado

    } catch (err) {
        throw new Error (`Error en la lectura ${err}`)
    }
}

app.get("/productoRandom", async (req, res) => {

    readFile().then( respuesta => {
        let productos = JSON.parse(respuesta)
        return productos
    })


    let numero = Math.ceil(Math.random() * 3)
    let producto = await getById(numero)
    res.send("El numero elegido es " + JSON.stringify(producto)) 
});


async function readFile(){
    try{
        const productos = await fs.promises.readFile(`productos.txt`, `utf-8`);
        return productos;
    }catch(err){
        console.log(`No se encontro el archivo.
        Error: ${err}.`)
    }
}

app.get("/productos", async (req, res) => {
    readFile().then( respuesta => {
        let productos = JSON.parse(respuesta)
        return productos
    })

     res.send("Listado de productos:" + await readFile())
});