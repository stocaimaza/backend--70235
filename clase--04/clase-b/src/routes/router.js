//Creación del Custom Router: 

import express from "express";
const router = express.Router();

class Router {
    constructor() {
        this.router = router;
        this.init();
    }

    getRouter() {
        return this.router;
        //Devuelve el objeto router
    }


    get(path, ...callbacks) {
        //Definimos una ruta en el get del router. 
        //El primer parametro es la ruta y los siguientes son los callbacks que se ejecutan cuando se haga get a esa ruta determinada. 
        this.router.get(path, this.generateCustomResponse ,this.applyCallbacks(callbacks));
    }

    //Creamos el método que me permite aplicar los distintos callbacks a las rutas: 
    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (req, res, next) => {
            try {
                await callback(req, res, next);
            } catch (error) {
                res.status(500).send("Error interno del servidor");
            }
        })
    }

    //Custom responses: 

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload}); 
        res.sendServerError = error => res.status(500).send({status: "error", error}); 
        res.sendUserError = error => res.status(400).send({status: "error", error}); 
        next(); 
    }
}

export default Router;