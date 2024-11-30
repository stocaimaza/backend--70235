//Creación del Custom Router: 

import { Router } from "express";
const router = Router(); 

class Router {
    constructor() {
        this.router = router;
        this.init(); 
    }

    getRouter() {
        return this.router;
        //Devuelve el objeto router
    }

}

export default Router;