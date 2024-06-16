import express from 'express';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/view.routes.js';

const app = express();
const port = 8080;

// Middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'));

// Express Handlebars //
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas //
app.use('/', productsRouter);
app.use('/', cartsRouter);
app.use('/', viewsRouter);

app.listen(port, () => {
  displayRoutes(app)
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



