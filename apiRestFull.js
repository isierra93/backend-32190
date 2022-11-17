//EXPRESS
const express = require(`express`);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//FILE SYSTEM
const fs = require(`fs`);

//SERVER ON
const PORT = 8080;
const server = app.listen( PORT, (err)=>{
    if(err) throw new Error (`Error en el servidor ${err}`);
    console.log(`Escuchando en el 8080.`);
});

//ROUTER
const { Router } = express;
const routerProductos = new Router();
app.use(`/api/productos`, routerProductos);

//FUNCIONES
async function getElements(){
    try{
        const productos = await fs.promises.readFile(`productos.txt`, `utf-8`);
        let listProducts = JSON.parse(productos);
        return listProducts;
    }catch(err){
        throw new Error (`Error en la lectura` + err);
    }
};

async function getById(index) {
    try {
        const productos = await fs.promises.readFile(`productos.txt`, `utf-8`);
        let listProducts = JSON.parse(productos);
        const resultado = listProducts.filter(producto => producto.id == index);

        if (resultado.length === 0) {
            return null
        };
        return resultado;

    } catch (err) {
        throw new Error (`Error en la lectura ${err}`);
    }
}

function createId(arr){
    const listadoFinal = arr.forEach(element => {
        element.id = arr.indexOf(element) + 1;
    });
    return listadoFinal;
}

async function save(listProducts) {
    try {
        await fs.promises.writeFile(`productos.txt`, JSON.stringify(listProducts, null, 2));
    } catch (err) {
        throw new Error (`Error en la escritura ${err}`);
    }
};

//RUTAS
routerProductos.get(`/`, async (req, res) =>{
    const productos = await getElements();
    res.json(productos);
});

routerProductos.get(`/:id`, async (req, res)=>{
    const { id } = req.params;
    const prod = await getById(id);
    prod == null ?
    res.json({error:`producto no encontrado`})
    :res.json(prod)
});

routerProductos.post(`/`, async (req, res) =>{
    const nuevoProducto = req.body;
    const listadoProductos = await getElements();
    listadoProductos.push(nuevoProducto);
    createId(listadoProductos);
    await save(listadoProductos);
    res.json({Producto: listadoProductos[listadoProductos.length-1]});
});

routerProductos.put(`/:id`, async (req, res) => {
    const { id } = req.params;
    const prod = req.body;
    const productos = await getElements();
    const validation = productos.filter(prod => prod.id == id);
    if(validation.length < 1){
        return res.json({error:`producto no encontrado`});
    };
    productos.splice(id-1, 1);
    productos.push(prod);
    createId(productos);
    await save(productos);
    res.json(productos);
});

routerProductos.delete(`/:id`, async (req, res) => {
    const { id } = req.params;
    const productos = await getElements();
    const validation = productos.filter(prod => prod.id == id);
    if(validation.length < 1){
        return res.json({error:`producto no encontrado`})
    }
    productos.splice(id-1, 1);
    createId(productos);
    await save(productos);
    res.json(productos);
})