
class JugueteDTO {
    constructor(juguete) {
        this.nombre = juguete.nombre;
        this.categoria = juguete.categoria; 
        this.precio = juguete.precio; 
        this.fullname = `${juguete.nombre} ${juguete.categoria}`; 
        //Concatenamos el nombre y la categoria para crear el fullname que el front no me esta enviando. 
    }
}

export default JugueteDTO; 