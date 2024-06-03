import { Router } from "express";
import bodyParser from 'body-parser';

const products = [
    { id: 1, nombre: "Producto 1", precio: 10 },
    { id: 2, nombre: "Producto 2", precio: 20 },
    { id: 3, nombre: "Producto 3", precio: 30 },
    { id: 4, nombre: "Producto 4", precio: 40 },
    { id: 5, nombre: "Producto 5", precio: 50 },
    { id: 6, nombre: "Producto 6", precio: 60 },
    { id: 7, nombre: "Producto 7", precio: 70 },
    { id: 8, nombre: "Producto 8", precio: 80 },
    { id: 9, nombre: "Producto 9", precio: 90 },
    { id: 10, nombre: "Producto 10", precio: 100 },
];

const router = Router();

// Middleware para parsear el cuerpo de las solicitudes POST
router.use(bodyParser.json());

router.get('/api/products', (req, res) => {
    res.json({
        message: "ok",
        products
    });
});

router.get("/api/products/:id", (req, res) => {
    let { id } = req.params;
    let productoBuscado = products.find(producto => producto.id === parseInt(id));

    if (productoBuscado) {
        res.send(productoBuscado);
    } else {
        res.send("El producto buscado no existe");
    }
});

/*
// Ruta POST para agregar un nuevo producto
router.post('/api/products/new', (req, res) => {
    const { id, title, description, code, status, price, stock, category, thumbnails } = req.body;

    if (!id || !title || !description || !code || !status || !price || !stock || !category || !thumbnails) {
        return res.status(400).send("Todos los campos son requeridos");
    }

    const newProduct = {
        id,
        title,
        description,
        code,
        status,
        price,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);
    res.status(201).json({
        message: "Producto agregado exitosamente",
        product: newProduct
    });
});
*/

export default router;