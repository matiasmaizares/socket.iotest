import { randomUUID } from "crypto"
import { Router } from "express"
import express from "express"
import { ProdManager } from "../fileManager.js"
import { Producto } from "../static/Producto.js"

export const productosRouter = Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

const productosManager = new ProdManager("./src/static/products.json")

productosRouter.get("/", async (req, res) => {
    try {
        const productos = await productosManager.buscarProductos()
        res.json(productos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

productosRouter.get("/:pid", async (req, res) => {
    try {
        const producto = await productosManager.buscarProdById(req.params.pid)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

productosRouter.post("/", async (req, res) => {
    try {
        const producto = new Producto({
            id: randomUUID(),
            ...req.body
        })
        const agregado = await productosManager.agregarProd(producto)
        res.json(agregado)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

productosRouter.put("/:pid", async (req, res) => {
    let productoReemplazado
    try {
        productoReemplazado = new Producto({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    try {
        const actualizado = await productosManager.actulizarProd(req.params.pid, productoReemplazado)
        res.json(actualizado)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

productosRouter.delete("/:pid", async (req, res) => {
    try {
        const borrado = await productosManager.borrarProdSegunId(req.params.pid)
        res.json(borrado)
    } catch (error) {
        res.status(204).json({"message": error.message})
    }
})

