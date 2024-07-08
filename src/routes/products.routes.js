import express from "express";
const router = express.Router();
import ProductManager from "../dao/db/productManagerDb.js";
const productManager = new ProductManager();

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

// Método GET para visualizar todos los productos con paginación, filtrado y ordenamiento
router.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const sort = req.query.sort;
        const query = req.query.query;

        let productos = await productManager.getProducts();

        if (query) {
            productos = productos.filter(producto => producto.category.includes(query));
        }
        if (sort) {
            if (sort === 'asc') {
                productos.sort((a, b) => a.price - b.price);
            } else if (sort === 'desc') {
                productos.sort((a, b) => b.price - a.price);
            }
        }

        const totalProductos = productos.length;
        const totalPages = Math.ceil(totalProductos / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedProductos = productos.slice(startIndex, endIndex);

        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        res.json({
            status: "success",
            payload: paginatedProductos,
            totalPages: totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        console.error("Error al obtener productos", error);
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