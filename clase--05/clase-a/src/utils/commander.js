//3) Procesamiento de Argumentos con Comander.
//npm install commander

import { Command } from "commander";
const program = new Command(); 

//1 - Comando // 2  - La descripcion // 3 - Valor por default

program
    .option("-p <port>", "puerto en el que se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse()


//console.log("Opciones: ", program.opts()); 
//Con esto puedo ver las opciones que configuramos. 


export default program;