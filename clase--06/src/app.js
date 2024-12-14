/** ARQUITECTURA POR CAPAS **/

import express from "express";
import { engine } from "express-handlebars";
import cors from "cors"; 
import juguetesRouter from "./routes/juguetes.router.js"; 
import viewsRouter from "./routes/views.router.js"; 
const app = express(); 
const PUERTO = 8080; 
/// Base de datos con Singleton: 
import BaseDatos from "./database.js";
const instanciaBD = BaseDatos.getInstacia(); 
///

//Middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cors());

//Configurar Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
app.use("/juguetes", juguetesRouter); 
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})

//PATRON DE DISEÑO: es una solución replicable para problemas comunes de desarrollo. 
