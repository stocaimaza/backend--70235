import { Router } from "express";
const router = Router(); 

//Voy a importar de la capa del controlador los metodos que necesito:
import JugueteController from "../controllers/juguete.controller.js";
const jugueteController = new JugueteController(); 

router.get("/", jugueteController.obtenerJuguetes); 
router.post("/", jugueteController.crearJuguete); 

export default router;