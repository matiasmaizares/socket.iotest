import { Router } from "express"
import express from "express"
import { cartManager } from "../carritoManager.js"
import { Carrito } from "../static/carrito.js"
import { randomUUID } from "crypto"
import { Producto } from "../static/Producto.js"

export const carritoRouter = Router()

carritoRouter.use(express.json())
carritoRouter.use(express.urlencoded({ extended: true }))

const carritoManager = new cartManager("././src/static/carrito.json")

carritoRouter.get("/:cid", async (req, res) => {
    try {
        const carrito = await carritoManager.buscarCarritoPorId(req.params.cid)
        res.json(carrito)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

carritoRouter.post("/", async (req, res) => {
    try {
        const carrito = new Carrito({
            id: randomUUID(),
            products: []
        })
        const carritoNuevo = await carritoManager.agregarAlCarrito(carrito)
        res.json(carritoNuevo)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

carritoRouter.post("/:cid/products/:pid", async (req, res) => {
    
    try {
        const carrito = new Carrito({
            product: req.params.pid,
            quantity: 1
        })
        const carritoNuevo = await carritoManager.agregarAlCarrito(carrito.products)
        res.json(carritoNuevo)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})