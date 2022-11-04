const fs = require(`fs`);

const productosBase = [
    {
        title: `Notebook Gamer`,
        price: 500,
        thumbnail: `https://http2.mlstatic.com/D_NQ_NP_806340-MLA51423594714_092022-O.webp`
    },
    {
        title: `Colchon Sommier`,
        price: 250,
        thumbnail: `https://http2.mlstatic.com/D_NQ_NP_898982-MLA49837454026_052022-O.webp`
    },
    {
        title: `Camiseta River Plate`,
        price: 30,
        thumbnail: `https://http2.mlstatic.com/D_NQ_NP_614707-MLA52163002775_102022-O.webp`
    }
]

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
    }

    async getAll () {
        let listProducts = []
        try{
            const productos = await fs.promises.readFile(`./${this.nombre}.txt`, `utf-8`);
            listProducts = JSON.parse(productos);
            return listProducts;
        }catch(err){
            console.log(`No se encontro el archivo, se creara uno nuevo.
            Error: ${err}.`)
            return []
        }
    }

    async save(obj) {

        let listProducts = await this.getAll()
        listProducts.push(obj)
        listProducts.forEach(element => {
            element.id = listProducts.indexOf(element) + 1;
        });

        try {
            await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(listProducts, null, 2))
        } catch (err) {
            throw new Error (`Error en la escritura ${err}`);
        }

        listProducts.reverse()
        return listProducts[0].id
    }

    async getById(index) {
        try {
            const productos = await fs.promises.readFile(`./${this.nombre}.txt`, `utf-8`);
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


    async deleteById(index){
        let listProducts = []

        try{
            const productos = await fs.promises.readFile(`./${this.nombre}.txt`, `utf-8`)
            listProducts = JSON.parse(productos);
            listProducts.splice((index-1), 1);
            listProducts.forEach(element => {
                element.id = listProducts.indexOf(element) + 1;
            });
        }
        catch(err){
            throw new Error (`Error de lectura: ${err}`)
        }

        try{
            await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(listProducts, null, 2))
        }catch(err){
            throw new Error (`Error de escritura: ${err}`)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.unlink(`./${this.nombre}.txt`);
        }catch(err){
            throw new Error (`Error al borrar archivo: ${err}`);
        }
    }
}

const productos = new Contenedor(`Productos`);

setTimeout( ()=>{
    console.log(`Se guarda el producto base 0`)
    productos.save(productosBase[0]).then( res => console.log(res))
},1000)

setTimeout( ()=>{
    console.log(`Se guarda el producto base 1`)
    productos.save(productosBase[1]).then( res => console.log(res));
},2000)

setTimeout( ()=>{
    console.log(`TODOS LOS PRODUCTOS:`)
    productos.getAll().then(res => console.log(res))
},3000)

setTimeout( ()=>{
    console.log(`Se guarda el producto base 2`)
    productos.save(productosBase[2]).then( res => console.log(res));
},4000)

setTimeout( ()=>{
    console.log(`Se muestra el producto ID 2`)
    console.log((productos.getById(2).then(res => console.log(res))))
},5000)

setTimeout( ()=>{
    console.log(`Se borra el producto ID 2`)
    productos.deleteById(2)
},6000)

setTimeout( () =>{
    console.log(`TODOS LOS PRODUCTOS:`)
    productos.getAll().then(res => console.log(res))
},7000)
