import { Router } from "express";
const router = Router(); 
import { generarNumRuleta, verificarApuesta } from "../controllers/apusta.controller.js";

router.post("/spin", (req, res) => {
    const bet = req.body.bet;  //Aca recuperamos el numerito apostado. 
    const result = generarNumRuleta(); //Aca tenemos el numero aleatorio. 
    const outcome = verificarApuesta(bet, result); 
    //Verificamos que la apuesta es correcta y enviamos la respuesta: 
    res.json(outcome); 
})

export default router; 