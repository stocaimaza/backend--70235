
//Función para generar un numero aleatorio de la ruleta.

export const generarNumRuleta = () => {
    // const numeros = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]; 
    const numeros = [0];

    //Seleccionamos un numero aleatorio de la lista. 

    const randomIndex = Math.floor(Math.random() * numeros.length); 
    return numeros[randomIndex]; 
}

//Funcion para verificar apuesta. 

export const verificarApuesta = (bet, result) => {
    if (bet === result) {
        return {message: "¡Ganaste!", result};
    } else {
        return {message: "¡Perdiste, segui intentando!", result}; 
    }
}