import { Router } from "express";

const products = [
    { id: "00001", nombre: "Producto 1", precio: 10, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00002", nombre: "Producto 2", precio: 20, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00003", nombre: "Producto 3", precio: 30, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00004", nombre: "Producto 4", precio: 40, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00005", nombre: "Producto 5", precio: 50, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00006", nombre: "Producto 6", precio: 60, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00007", nombre: "Producto 7", precio: 70, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00008", nombre: "Producto 8", precio: 80, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00009", nombre: "Producto 9", precio: 90, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
    { id: "00010", nombre: "Producto 10", precio: 100, status: true, thumbnails: ["path/to/image1.jpg", "path/to/image2.jpg"] },
];

const router = Router();

function generateId() {
    const id = Math.floor(10000 + Math.random() * 90000);
    return id.toString().padStart(5, '0');
}

// Metodo GET para visualizar todos los productos o por ID
router.get('/api/products', (req, res) => {
    res.json({
        message: "Mostrando todos los productos",
        products
    });
});

router.get("/api/products/:id", (req, res) => {
    let { id } = req.params;
    let productoBuscado = products.find(producto => producto.id === id);

    if (productoBuscado) {
        res.send(productoBuscado);
    } else {
        res.send("El producto buscado no existe");
    }
});

// Metodo POST para agregar un nuevo producto
router.post('/api/products', (req, res) => {
    const { title, description, code, status, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || status === undefined || !price || !stock || !category || !thumbnails) {
        return res.status(400).send("Todos los campos son requeridos");
    }

    if (typeof status !== 'boolean') {
        return res.status(400).send("El campo 'status' debe ser un booleano");
    }

    if (!Array.isArray(thumbnails) || !thumbnails.every(t => typeof t === 'string')) {
        return res.status(400).send("El campo 'thumbnails' debe ser un array de strings");
    }

    const newProduct = {
        id: generateId(),
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

// Metodo PUT para actualizar un producto por ID
router.put('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const updateData = req.body;

    const productIndex = products.findIndex(product => product.id === pid);
    if (productIndex === -1) {
        return res.status(404).send("El producto no existe");
    }

    if (updateData.id) {
        delete updateData.id;
    }

    if (updateData.status !== undefined && typeof updateData.status !== 'boolean') {
        return res.status(400).send("El campo 'status' debe ser un booleano");
    }

    if (updateData.thumbnails && (!Array.isArray(updateData.thumbnails) || !updateData.thumbnails.every(t => typeof t === 'string'))) {
        return res.status(400).send("El campo 'thumbnails' debe ser un array de strings");
    }

    const updatedProduct = { ...products[productIndex], ...updateData };
    products[productIndex] = updatedProduct;

    res.json({
        message: "Producto actualizado exitosamente",
        product: updatedProduct
    });
});

// Metodo DELETE para eliminar un producto por ID
router.delete('/api/products/:pid', (req, res) => {
    const { pid } = req.params;

    const productIndex = products.findIndex(product => product.id === pid);
    if (productIndex === -1) {
        return res.status(404).send("El producto no existe");
    }

    products.splice(productIndex, 1);

    res.json({
        message: "Producto eliminado exitosamente"
    });
});

export default router;