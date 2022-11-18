const express = require(`express`);
const app = express();
app.set(`views`,`./views`);
app.set(`view engine`, `pug`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const server = app.listen(PORT, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`Escuchando en el 8080.`);
});


const productos = []

app.get(`/`, (req, res) => {
    res.render(`datos`);
});

app.post(`/productos`, (req, res)=>{
    console.log(productos);
    productos.push(req.body);
    console.log(productos);
    res.redirect(`/`);
});

app.get(`/productos`, (req, res)=>{
    res.render(`tabla`,{productos});
})
