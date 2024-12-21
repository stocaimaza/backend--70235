import { Router } from "express";
const router = Router(); 

import { getUsers, getUserById, saveUser } from "../controllers/user.controller.js";

router.get("/", getUsers);
router.post("/", saveUser); 
router.get("/:uid", getUserById); 

export default router; 