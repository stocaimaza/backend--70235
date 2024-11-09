//Instalamos: npm i express mongoose express-handlebars

import express from "express";
import todoRouter from "./routes/todo.router.js";
import { engine } from "express-handlebars";
import "./database.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public")); 

//Configuramos Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
// app.get("/", (req, res) => {
//     res.send("Hola Mundo, bienvenidos a Backend 2");
// })
app.use("/", todoRouter); 


//Listen
app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080"); 
})

