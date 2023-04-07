import { Router } from "express";
import { productosRouter } from "./productosRouter.js";
import { ventasRouter } from "./ventasRouter.js";
import { carritoRouter } from "./carritoRouter.js";

export const apiRouter = Router();

/* apiRouter.use() */

apiRouter.use("/productos", productosRouter)
apiRouter.use("/ventas", ventasRouter)
apiRouter.use("/carrito", carritoRouter)
