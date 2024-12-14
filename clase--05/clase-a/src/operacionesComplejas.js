// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i; 
//     }

//     return resultado; 
// }

// process.on("message", message => {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i; 
//     }

//    process.send(resultado); 
// })

// process.on("message", message => {
//     let result = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         result += i;
//     }

//     process.send(result);
// })

process.on("message", (message) => {
    let result = 0;

    for (let i = 0; i < 5e9; i++) {
        result += i;
    }

    // Enviar el resultado como un número, no como un objeto
    process.send(result);
});
