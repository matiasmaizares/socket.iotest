import fs from "fs/promises"

export class cartManager {
    constructor(ruta){
        this.ruta = ruta
        this.carrito = []
    }

    async leerArchivo() {
        const json = await fs.readFile(this.ruta, "utf-8")
        this.carrito = JSON.parse(json)
    }

    async cargarArchivo() {
        const json = JSON.stringify(this.carrito, null, 2)
        await fs.writeFile(this.ruta, json)}
    
    async agregarAlCarrito(prod) {
        await this.leerArchivo()
        this.carrito.push(prod)
        await this.cargarArchivo()
        return prod
    }

    async buscarCarritoPorId(id){
        await this.leerArchivo()
        const buscado = this.carrito.find(c => c.id === id )
        return buscado
    }
}