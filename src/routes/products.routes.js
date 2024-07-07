import express from "express";
const router = express.Router();
import ProductManager from "../dao/db/productManagerDb.js";
const productManager = new ProductManager();

// Método GET para visualizar todos los productos
router.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        }
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Método GET para visualizar los productos por ID
router.get("/api/products/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Método POST para agregar un nuevo producto
router.post("/api/products", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({ message: "Producto agregado exitosamente" });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Método PUT para actualizar un producto por ID
router.put("/api/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(id, productoActualizado);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Método DELETE para eliminar un producto por ID
router.delete("/api/products/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const deletedProduct = await productManager.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;