/** RUTEO AVANZADO **/

//Expresiones regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Ejemplo: validar si el texto ingresado por el usuario corresponde a un email con el formato "nombre@dominio.com"

//Ejemplo con un correo electronico: 

// let correoIngresado = "lionelmessi@hotmail.com"; 
// let correoFalso = "tinkiwinki"; 
// const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// console.log(patronCorreo.test(correoIngresado)); 
// console.log(patronCorreo.test(correoFalso)); 

// //Ejemplo de numero de telefono: 

// const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;
// let telefonoIngresado = "(223) 669-3878"; 

// console.log("Verificamos un tel: " + patronTelefono.test(telefonoIngresado));

//RESTRINGIENDO PARAMETROS: 

import express from "express";
const app = express(); 
const PUERTO = 8080;
import clientesRouter from "./routes/clientes.router.js"; 

//Middlewares: 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

//Rutas: 
app.use("/clientes", clientesRouter);

//¿Que hacemos con las rutas que no coinciden con ningun endpoint? 

app.get("*", (req, res) => {
    res.status(404).send({message: "No se encuentra nada, este finde llueve"}); 
})

app.listen(PUERTO, () => console.log("Trabajando en el PUERTO: 8080"));

