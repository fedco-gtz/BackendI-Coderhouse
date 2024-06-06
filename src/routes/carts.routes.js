import { Router } from 'express';

const router = Router();

let carts = [];
let cartIdCounter = 1;

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

// Método GET para visualizar los productos del carrito por ID
router.get('/api/carts/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find(c => c.id === cartId);
  if (!cart) {
    return res.status(404).json({ message: 'El producto no existe en el carrito' });
  }
  res.json(cart.products);
});

// Método GET para mostrar un producto específico dentro de un carrito
router.get('/api/carts/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = carts.find(c => c.id === cartId);
  if (!cart) {
    return res.status(404).json({ message: 'El carrito no existe' });
  }

  const productInCart = cart.products.find(p => p.id === productId);
  if (!productInCart) {
    return res.status(404).json({ message: 'El producto no existe en el carrito' });
  }

  res.status(200).json(productInCart);
});

// Método POST para agregar productos al carrito
router.post('/api/carts', (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || !products.every(product => 'name' in product && 'description' in product && 'price' in product && 'stock' in product)) {
    return res.status(400).json({ error: 'Datos de producto no válidos' });
  }

  let productIdCounter = 1;

  const newCart = {
    id: cartIdCounter++,
    products: products.map(product => ({
      id: productIdCounter++,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    }))
  };

  carts.push(newCart);

  res.status(201).json(newCart);
});

// Método POST para agregar un producto al carrito por ID de carrito y ID de producto
router.post('/api/carts/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = carts.find(c => c.id === cartId);
  if (!cart) {
    return res.status(404).json({ message: 'El carrito no existe' });
  }

  const productInCart = cart.products.find(p => p.id === productId);

  if (productInCart) {
    if (productInCart.quantity) {
      productInCart.quantity += 1;
    } else {
      productInCart.quantity = 2;
    }
  } else {
    cart.products.push({ id: productId, quantity: 1 });
  }

  res.status(201).json(cart);
});

export default router;