class MemoryJugueteDAO {
    constructor() {
        this.juguetes = []; 
    }

    async crearJuguete(datosJuguete) {
        try {
            this.juguetes.push(datosJuguete); 
        } catch (error) {
            throw new Error("Error al crear el juguete en memoria");
        }
    }

    async obtenerJuguetes() {
        try {
            return this.juguetes; 
        } catch (error) {
            throw new Error("Error al obtener los juguetes en memoria");
        }
    }
}

export default MemoryJugueteDAO; 