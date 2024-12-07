import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Aca colocamos todas nuestras rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de Usuarios"); 
            //res.sendSuccess("Hola Alumnos, feliz sabado, todo es un exito"); 
            res.sendServerError("Error en el servidor, vamos a morir, el chat gtp3 cobro vida"); 
        })
    }
}

export default UserRouter; 