import { Router } from 'express';
import ProductManager from "../dao/db/productManagerDb.js";
const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
    res.render('home');
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
})

router.get("/products", async (req, res) => {
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

        res.render('products', {
            status: "success",
            payload: paginatedProductos,
            totalPages: totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}` : null,
            nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}` : null
        });
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.render("productDetails", { producto });
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default router;