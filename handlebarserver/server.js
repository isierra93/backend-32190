const express = require(`express`);
const handlebars = require(`express-handlebars`);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine(`hbs`, handlebars.engine())

app.set(`views`,`./views`);
app.set(`view engine`,`hbs`);
app.use(express.static(`public`));

const PORT = 8080;
const server = app.listen(PORT, ( err ) =>{
    if (err) throw new Error (`Error en el servidor ${err}`);
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