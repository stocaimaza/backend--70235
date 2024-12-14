import fs from "fs"; 

class FileSystemJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            const juguetes = await this.leerArchivo();
            //Leemos el archivo. 

            juguetes.push(datosJuguete); 
            //Agregamos el nuevo producto. 

            await this.guardarArchivo(juguetes);
            return datosJuguete; 
        } catch (error) {
            throw new Error("Error al crear un juguete en archivos"); 
        }
    }

    async obtenerJuguetes() {
        try {
            const juguetes = await this.leerArchivo(); 
            return juguetes; 
        } catch (error) {
            throw new Error("Error al leer los juguetes de archivos"); 
        }
    }

    //Métodos auxiliares: 

    async leerArchivo() {
        const data = await fs.promises.readFile("./src/data/juguetes.json"); 
        return JSON.parse(data);
    }

    async guardarArchivo(data) {
        await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(data, null, 2));
    }
}

export default FileSystemJugueteDAO; 

