import { Router } from "express";


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
]

const router = Router();

router.get('/api/products', (req, res) => {
    res.send("HOLA")
});


export default router;