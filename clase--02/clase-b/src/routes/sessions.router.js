import { Router } from "express";
const router = Router(); 
import { createHash, isValidPassword } from "../utils/hashbcryp.js";
//No se olviden de importar el UserModel!

import UserModel from "../models/user.model.js";

//1) VAMOS A REGISTRAR UN USUARIO: 

// router.post("/register", async (req, res) => {
//     const {first_name, last_name, email, password, age} = req.body; 

//     try {
//         //1) Vamos a verificar si el correo electronica ya esta registrado: 
//         const existeUsuario = await UserModel.findOne({email: email}); 

//         if(existeUsuario) {
//             return res.status(400).send({error: "El correo electronico ya esta registrado"}); 
//         }

//         //Si no lo encuentra, creamos un nuevo User: 
//         const nuevoUsuario = await UserModel.create({first_name, last_name, email, password:createHash(password), age})

//         res.redirect("/login");
//         // //Almacenamos info del usuario en la sesion (pueden ajustarlo segun sus necesidades)
//         // req.session.user = {
//         //     first_name: nuevoUsuario.first_name, 
//         //     last_name: nuevoUsuario.last_name
//         // }

//         // res.status(200).send({mensaje: "Usuario creado con exitoooo, siiiiiii"});
//     } catch (error) {
//         res.send({error: "Error al crear el usuario"});
//     }
// })

//VERSION DE REGISTRO CON PASSPORT: 
import passport from "passport";

router.post("/register", passport.authenticate("register", {}) ,async (req, res) => {

    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name
    } 

    req.session.login = true;

    res.redirect("/profile"); 
})


//2) VAMOS A LOGUEARNOS: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body; 

    try {
        //Buscamos el usuario: 
        const usuario = await UserModel.findOne({email: email}); 

        //Si lo encuentro
        if(usuario) {
            //Verificamos la contraseña con isValidPassword. 
            if(isValidPassword(password, usuario)) {            
                //Si la contraseña coincide creo la session: 
                req.session.login = true; 
                req.session.user = {
                    first_name: usuario.first_name, 
                    last_name: usuario.last_name
                }
                //res.status(200).send({mensaje: "Login Correcto! Ma jes tuo seishon"}); 

                res.redirect("/profile");
            } else {
                res.send({error: "La contraseña que me pasaste es horrible!"});
            }

        } else {
            //Si no encuentro al usuario, podemos cerrar la operacion con el siguiente mensaje: 
            res.send({error: "Usuario no encontrado"});
        }
    } catch (error) {
        res.send({error: "Error en todo el proceso de Login"}); 
    }
})

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


export default router; 