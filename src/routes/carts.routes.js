import express from 'express';
const router = express.Router();
import CartManager from '../dao/db/cartManagerDb.js';
const cartManager = new CartManager();

// Método POST para crear el carrito de compras
router.post('/api/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear un nuevo carrito', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Método GET para visualizar los productos del carrito por ID
router.get('/api/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error('Error al obtener el carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Método POST para agregar un producto al carrito por ID de carrito y ID de producto
router.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ products: actualizarCarrito.products });
    } catch (error) {
        console.error('Error al agregar producto al carrito', error);
        if (error.message.includes('No existe un carrito')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

export default router;
