import { Router } from "express";
const router = Router(); 
import { getOrders, getOrderById, createOrder, resolveOrder } from "../controllers/order.controller.js";

router.get("/", getOrders);
router.post("/", createOrder); 
router.get("/:oid", getOrderById); 
router.put("/:oid", resolveOrder); 

export default router; 