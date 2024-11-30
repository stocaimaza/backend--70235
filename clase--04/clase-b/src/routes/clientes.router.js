import { Router } from "express";
const router = Router();

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //En esta situacion yo estoy esperando un parametro por la url, el nombre de un cliente. 
    
    //¿Que ocurre si el usuario ingresa numeros o caracteres especiales? 
    res.send(req.params.cliente); 
})

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = req.params.email; 

    if(patronCorreo.test(email)){
        res.send("Email valido: " + email); 
    } else {
        res.send("Email invalido!"); 
    }
})

export default router; 

//MEJORAMOS LAS OPERACIONES COMUNES: 

//Método GET
router.get("/nombre:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parametro cliente. 
    res.send("Obteniendo recurso para el cliente: " + req.params.cliente);
})


//Método POST
router.post("/nombre:cliente([a-z]+)", (req, res) => {
    //Voy a enviar un recurso a partir del parametro cliente. 
    res.send("Enviando recurso para el cliente: " + req.params.cliente);
})


//Método PUT
router.put("/nombre:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parametro cliente. 
    res.send("Actualizando recurso para el cliente: " + req.params.cliente);
})


//Método DELETE
router.delete("/nombre:cliente([a-z]+)", (req, res) => {
    //Voy a borrar un recurso a partir del parametro cliente. 
    res.send("Borrando recurso para el cliente: " + req.params.cliente);
})


//Nos encontramos que en los 4 metodos hay lineas de codigo que van a ser iguales y se van a repetir. 

//a) Obtener el parametro cliente. 
//b) Buscar el parametro en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

router.param("cliente", (req, res, next, cliente) => {
    const baseDatos = ["Firulais","lionel", "pepe"]; 
    //Aca emulamos a una base de datos. 

    if(baseDatos.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Cliente no encontrado");
    }

})