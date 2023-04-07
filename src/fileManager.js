import { json } from "express"
import fs from "fs/promises"

/* const ruta = "./static/productos.json" */

export class ProdManager {
    constructor(ruta){
        this.ruta = ruta
        this.productos = [] 
    }

    async leerArchivo() {
        const json = await fs.readFile(this.ruta, "utf-8")
        this.productos = JSON.parse(json)
    }

    async cargarArchivo() {
        const json = JSON.stringify(this.productos, null, 2)
        await fs.writeFile(this.ruta, json)
    }

    async buscarProductos(){
        await this.leerArchivo()
        return this.productos
    }

    async agregarProd(prod) {
        await this.leerArchivo()
        this.productos.push(prod)
        await this.cargarArchivo()
        return prod 
    }

    async buscarProdById(id) {
        await this.leerArchivo()
        const buscado = this.productos.find(p => p.id === id) 
        if (!buscado) {
            throw new Error ("ID de producto no encontrado")
        }
        return buscado
    }

    async actulizarProd(id, nuevoProd) {
        await this.leerArchivo()
        const indiceProd = this.productos.findIndex( p => p.id === id)
        if ( indiceProd === -1){
            throw new Error ("id no encontrado")
        }
        this.productos[indiceProd] = nuevoProd
        await this.cargarArchivo()
        return nuevoProd
    }
    
    async borrarProdSegunId(id){
        await this.leerArchivo()
        const indiceProd = this.productos.findIndex( p => p.id === id)
        if ( indiceProd === -1){
            throw new Error ("id no encontrado")
        }
        const [borrado] = this.productos.splice(indiceProd, 1)
        await this.cargarArchivo()
    }
}