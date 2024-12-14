//Acá vamos a crear los métodos "crearJuguete" y "obtenerJuguetes": 

//APLICACION CON DAO: 

//MongoDB: 
import MongoDBJugueteDAO from "../dao/mongoDBJugueteDAO.js";

//Memoria: 
import MemoryJugueteDAO from "../dao/memoryJugueteDAO.js";

//Con File System: 
import FileSystemJugueteDAO from "../dao/fileSystemJugueteDAO.js";


//Creo la instancia: 
//const jugueteServices = new FileSystemJugueteDAO(); 

//TRABAJAMOS CON FACTORY: 
import DAO from "../dao/factory.js";
const jugueteServices = new DAO(); 

//Importamos el DTO: 
import JugueteDTO from "../dto/juguetes.dto.js";

class JugueteController {
    async crearJuguete(req, res) {
        try {
            //const juguete = await jugueteServices.crearJuguete(req.body); 

            //Acá usamos el DTO: 

            const jugueteDTO = new JugueteDTO(req.body);
            const juguete = await jugueteServices.crearJuguete(jugueteDTO); 
            res.json(juguete);
        } catch (error) {
            res.status(500).json({status:"error", mensaje: "Error al crear el juguete"}); 
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteServices.obtenerJuguetes(); 
            res.json(juguetes); 
        } catch (error) {
            res.status(500).json({status:"error", mensaje: "Error al obtener los juguetes"}); 
        }
    }
}

export default JugueteController; 