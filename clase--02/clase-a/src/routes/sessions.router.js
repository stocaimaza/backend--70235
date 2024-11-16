import { Router } from "express";
const router = Router(); 
//No se olviden de importar el UserModel!

import UserModel from "../models/user.model.js";

//1) VAMOS A REGISTRAR UN USUARIO: 

router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        await UserModel.create({
            first_name, last_name, email, password, age
        })

        res.status(200).send({mensaje: "Usuario creado con exitoooo, siiiiiii"});
    } catch (error) {
        res.send({error: "Error al crear el usuario"});
    }
})

//2) VAMOS A LOGUEARNOS: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body; 

    try {
        //Buscamos el usuario: 
        const usuario = await UserModel.findOne({email: email}); 

        //Si lo encuentro
        if(usuario) {
            //Verificamos la contraseña
            if(usuario.password === password) {
                //Si la contraseña coincide creo la session: 
                req.session.login = true; 
                res.status(200).send({mensaje: "Login Correcto! Ma jes tuo seishon"}); 
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


export default router; 