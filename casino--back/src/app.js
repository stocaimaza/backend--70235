/** CASINO ONLINE - "EL CARPINCHO DE BATAN" **/

import express from "express";
import cors from "cors";
import apuestaRouter from "./routes/apuesta.router.js"; 
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors()); //Habilitamos CORS para permitir solicitudes desde el front. 

//Rutas
app.use("/api", apuestaRouter); 

//Listen
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando desde Batan: ${PUERTO}`);
})
