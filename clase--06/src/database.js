// import mongoose from "mongoose";

// mongoose.connect("mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => console.log("Conectados correctamente a la BD"))
//     .catch((error) => console.log(error))

///PATRON DE DISEÑO SINGLETON: 
//Lo usamos para tener una instancia global de toda la aplicación.
//El caso más usado es cuando trabajamos con una Base de Datos. 
//Este patron verifica si ya existe una instancia de esta clase, en caso de que si exista, retornamos esa instancia, caso contrario la crea. 

import mongoose from "mongoose";

class BaseDatos {
    static #instancia;
    //Se declara una variable estatica y privada llamada "instancia". 

    constructor() {
        mongoose.connect("mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    }

    static getInstacia() {
        if(this.#instancia) {
            console.log("Conexio previa"); 
            return this.#instancia; 
        }

        this.#instancia = new BaseDatos();
        console.log("Conexión exitosa"); 
        return this.#instancia; 
    }
}

export default BaseDatos;



