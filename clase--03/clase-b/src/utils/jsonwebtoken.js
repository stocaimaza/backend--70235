//1) Instalamos: npm i jsonwebtoken

//2) Importamos el módulo: 

import jwt from "jsonwebtoken"; 

///Usamos una palabra secreta. 
const private_key = "palabrasecretaparatoken"; 

//Creamos una función para generar el Token: 
export const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"}); 
    //Le puedo colocar una fecha de expiración. 

    return token; 
}
