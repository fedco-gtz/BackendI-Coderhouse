import express from 'express';
import displayRoutes from 'express-routemap';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/', productsRouter);
app.use('/', cartsRouter);


app.get('/', (req, res) => {
  res.send("¡BIENVENIDO! <br> PreEntrega1-Gutierrez <br> Backend I - Comisión 69990")
});


app.listen(port, () => {
  displayRoutes(app)
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



