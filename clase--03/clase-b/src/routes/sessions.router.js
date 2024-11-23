import { Router } from "express";
const router = Router();
import passport from "passport";
import { createHash, isValidPassword } from "../utils/hashbcryp.js";
//No se olviden de importar el UserModel!

import UserModel from "../models/user.model.js";

//////////////////////////////////////////////////////////////////////
//EJERCICIO CON JSON WEB TOKEN: 

import { generateToken } from "../utils/jsonwebtoken.js";

//Registro: 

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const existeUsuario = await UserModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).send({ error: "El email ingresado ya esta registrado" });
        }

        //Creamos un nuevo usuario: 
        const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password: createHash(password), age });

        //Generamos un token: 
        const token = generateToken({ id: nuevoUsuario._id });

        res.status(200).send({ status: "success", mensaje: "usuario creado con exito", token });

    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: "Error terrible, se suspende el fin de semana" });
    }
})

//Login pero con mas datos: 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await UserModel.findOne({ email });

        if (!usuario) {
            return res.status(400).send({ mensaje: "Y este usuario de donde salio? " });
        }

        if (!isValidPassword(password, usuario)) {
            return res.status(401).send({ mensaje: "Contraseña re falsa ameeegoo ehhhh rescatateeeeee" });
        }

        //Si la contraseña es correcta, generamos el token: 

        const token = generateToken({
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            id: usuario._id
        })

        res.send({ status: "Todo bien!", token });

    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: "Error terrible, se suspende el fin de semana" });
    }
})






///////////////////////////////////////////////////////////////////////
//VERSION PARA GITHUB: 

// Ruta inicial: 

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

//Ruta callback:
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    //La estrategia de github nos retornará el usuario, entonces lo agregamos a nuestro objeto de session. 
    req.session.user = req.user;
    req.session.login = true;

    res.redirect("/profile");
})


///////////////////////////////////////////////////////////////////////


//1) VAMOS A REGISTRAR UN USUARIO: 

//VERSION DE REGISTRO CON PASSPORT: 
// import passport from "passport";

// router.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failedregister"}) ,async (req, res) => {

//     req.session.user = {
//         first_name: req.user.first_name, 
//         last_name: req.user.last_name
//     } 

//     req.session.login = true;

//     res.redirect("/profile"); 
// })

// router.get("/failedregister", (req, res) => {
//     res.send({error: "Registro fallido"}); 
// })

//2) VAMOS A LOGUEARNOS: 

//VERSION DE LOGIN CON PASSPORT: 

// router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}) , async (req, res) => {
//     req.session.user = {
//         first_name: req.user.first_name, 
//         last_name: req.user.last_name, 
//         age: req.user.age, 
//         email: req.user.email
//     }

//     req.session.login = true; 

//     res.redirect("/profile"); 
// })

// router.get("/faillogin", async (req, res) => {
//     res.send({error: "Fallo tooodoooo el login"}); 
// })

//Logout

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})


export default router; 