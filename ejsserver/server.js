const express = require(`express`);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(`view engine`,`ejs`);
app.use(express.static(__dirname));

const PORT = 8080;
const server = app.listen(PORT, (err) =>{
    if (err) throw new Error (`Error ene l servidor ${err}`);
    console.log(`Escuchando en el ${PORT}`);
});

const productos = [];

app.get(`/`, (req, res) => {
    res.render(`datos`);
});

app.post(`/productos`, (req, res)=>{
    productos.push(req.body);
    res.redirect(`/`);
});

app.get(`/productos`, (req, res)=>{
    res.render(`tabla`,{productos});
});