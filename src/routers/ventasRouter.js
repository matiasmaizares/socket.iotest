import { Router } from "express";

export const ventasRouter = Router();
ventasRouter.get("/", (req, res) => { res.send("ventas"); });
ventasRouter.post("/", (req, res) => { res.json(); });
ventasRouter.delete("/", (req, res) => { res.json(); });
ventasRouter.put("/", (req, res) => { res.json(); });
