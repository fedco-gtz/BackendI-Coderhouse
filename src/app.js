import express from 'express';
import displayRoutes from 'express-routemap';
import productsRouter from './routes/products.routes.js';

const app = express();
const port = 8080;

// Usar los routers
app.use('/', productsRouter);


app.get('/', (req, res) => {
  res.send("BIENVENIDO")
});

// Inicializo el servidor
app.listen(port, () => {
  displayRoutes(app)
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



