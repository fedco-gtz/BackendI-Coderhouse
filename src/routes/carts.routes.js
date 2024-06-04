import { Router } from "express";

const carts = [];

const router = Router();

function generateId() {
    const id = Math.floor(10000 + Math.random() * 90000);
    return id.toString().padStart(5, '0');
}

// Método GET para visualizar el carrito de compras
router.get('/api/carts', (req, res) => {
    if (carts.length === 0) {
        res.json({
            message: "El carrito está vacío",
            carts: []
        });
    } else {
        res.json({
            message: "Mostrando el carrito de compras",
            carts
        });
    }
});

// Método POST para agregar un nuevo carrito con productos
router.post('/api/carts', (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products) || !products.every(p => typeof p === 'object')) {
        return res.status(400).send("El campo 'products' debe ser un array de objetos");
    }

    for (const product of products) {
        const { title, description, code, status, price, stock, category, thumbnails } = product;
        
        if (!title || !description || !code || status === undefined || !price || !stock || !category || !thumbnails) {
            return res.status(400).send("Todos los campos del producto son requeridos");
        }

        if (typeof status !== 'boolean') {
            return res.status(400).send("El campo 'status' debe ser un booleano");
        }

        if (!Array.isArray(thumbnails) || !thumbnails.every(t => typeof t === 'string')) {
            return res.status(400).send("El campo 'thumbnails' debe ser un array de strings");
        }
    }

    const newCart = {
        id: generateId(),
        products
    };

    carts.push(newCart);
    res.status(201).json({
        message: "Carrito creado exitosamente",
        cart: newCart
    });
});


export default router;