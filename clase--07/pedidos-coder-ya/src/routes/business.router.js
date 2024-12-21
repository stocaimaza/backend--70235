import { Router } from "express";
const router = Router(); 

import { getBusiness, createBusiness, getBusinessById, addProduct } from "../controllers/business.controller.js"; 

router.get("/", getBusiness);
router.post("/", createBusiness); 
router.get("/:bid", getBusinessById);
router.post("/:bid/product", addProduct); 

export default router; 