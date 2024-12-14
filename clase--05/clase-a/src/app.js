/** CLASE 5: PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS **/

//Temas de hoy: 

//1) Objeto Process
//2) Manejo de Argumentos
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listeners
//6) Child Process

//Objeto Process: objeto que contiene información sobre el proceso de Node JS. 

//console.log(process); 

//Algunos elementos importantes: 

//console.log(process.cwd()); 
//Directorio actual del proceso

//console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo
//Por el momento, conocer este dato no nos resulta tan importante, pero si estamos trabajando con varios procesos, conocer el ID nos puede ayudar a realizar un monitoreo. 

//console.log(process.memoryUsage()); 
//Los valores estan en Bytes. 

//console.log(process.version); 
// Me va a retornar la version de Node 

//process.exit(); 
//Me permite salir del proceso.

//console.log("Texto adicional"); 

//2) Manejo de Argumentos: 

//process.argv: muestra los argumentos pasados por CLI. 

//console.log(process.argv);

//LEVANTAMOS UN SERVIDOR: 

// import express from "express"; 
// import mongoose from "mongoose";
// const app = express(); 
// import configObject from "./config/config.js";
// import UserModel from "./models/usuarios.model.js"; 

// //Voy a sacar los datitos que vienen en el configObject: 
// const {mongo_url, puerto} = configObject; 

// //Nos conectamos con la base de datos: 
// mongoose.connect(mongo_url)
//     .then(() => console.log("Conexion Exitosa!"))
//     .catch((error) => console.log("Tenemos un error: ", error))

// // Rutas

// app.get("/", async (req, res) => {
//     try {
//         const usuarios = await UserModel.find(); 
//         res.send(usuarios); 
//     } catch (error) {
//         res.status(500).send("Error terribleeee");
//     }
// })

// // Listen

// app.listen(puerto, () => console.log(`Escuchando en el puerto: ${puerto} `, )); 

//5) Listeners: Nuestro process puede escuchar los eventos que ocurran en la aplicación. 

//process.on(): es un método que me permite registrar escuchadores de eventos en el proceso de ejecución. 

//Algunos de los más utilizados: 

//on "exit": para ejecutar un código justo antes de la finalizacion del proceso. 

// process.on("exit", (code) => {
//     console.log("Terminamos el proceso con el siguiente codigo: ", code); 

// })

// console.log("Este se deberia mostrar primero, por mas que este lineas abajo en el codigo"); 

// // on "uncaughtException": Para atrapar alguna excepción que no haya sido considerada en algun catch. 

// process.on("uncaughtException", (error) => {
//     console.log("Tuvimos que capturar un error: ", error); 
//     process.exitCode = 1; 
// })

// firulais(); 

//6) Child Process: 

import express from "express";
const app = express();
const PUERTO = 8080;

//Ruta 

// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i; 
//     }

//     return resultado; 
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja(); 
//     res.send(`El resultado de la operación es de ${resultado}`); 
// })

app.get("/", (req, res) => {
    res.send("Bienvenidos al Home");
})

app.listen(PUERTO, () => console.log(`Escuchando en el ${PUERTO}`)); 

//Tenemos que lograr que el proceso de suma se realice sin bloquear al resto de los endpoints. 

//El proceso es el siguiente: 
//1) Separamos la funcion que trae problemas o otro modulo. 
//2) La modificamos y la dejamos disponible para cuando el padre la solicite. 
//3) Ejecutamos la ruta: 

import { fork } from "child_process"; 
//no hay que instalar nada, es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./operacionesComplejas.js"); 
    child.send("iniciando"); //El padre le envia un mensaje al proceso hijo. 
    child.on("message", result => {
        res.send(`El resultado de la operacion es: ${result}`);
    })
})

