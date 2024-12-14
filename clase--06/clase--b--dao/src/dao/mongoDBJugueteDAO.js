import JugueteModel from "../models/juguete.model.js";

class MongoDBJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JugueteModel(datosJuguete); 
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear un juguete en MongoDB"); 
        }
    }

    async obtenerJuguetes() {
        try {
            return await JugueteModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener juguetes de MongoDB"); 
        }
    }
}

export default MongoDBJugueteDAO; 