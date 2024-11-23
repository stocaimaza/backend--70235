//Instalamos: npm i bcrypt
//Importamos el módulo: 

import bcrypt from "bcrypt"; 

//Se crearan dos funciones: 
//a) createHash: aplica el has al password. 
//b) isValidPassword: compara el password propocionado con el de la base de datos. 

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt. 

//Un "salt" es un string random que hace que el proceso de hasheo se realice de forma impredecible. 

//genSaltSync(10) : generará un salt de 10 caracteres. 

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); 

//Compara los password y retorna verdadero o falso segun corresponda. 