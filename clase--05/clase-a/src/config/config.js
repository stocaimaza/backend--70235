//Instalamos DOTENV: npm i dotenv

import dotenv from "dotenv";

//dotenv.config(); 


//Tambien voy a necesitar "program" que trae todos los argumentos
import program from "../utils/commander.js"; 

//Recuerden que con program.opts() yo puedo ver todas las opciones configuradas. 

const { mode } = program.opts(); 
//Me estoy quedando con el datito del modo de trabajo. 

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
})

const configObject = {
    puerto: process.env.PUERTO, 
    mongo_url: process.env.MONGO_URL
}

export default configObject; 
