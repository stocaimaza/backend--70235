import { Router } from "express";
const router = Router(); 

//también puede acceder a Persistencia sin necesidad de pasar por negocio, siempre y cuando ésta tenga como fin único el de mostrar la información correspondiente. 

import JugueteService from "../services/juguete.services.js";
const jugueteServices = new JugueteService(); 

router.get("/", async (req, res) => {
    const juguetes = await jugueteServices.obtenerJuguetes(); 
    res.render("index", {juguetes}); 
})

export default router;