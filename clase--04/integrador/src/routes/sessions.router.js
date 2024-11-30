import { Router } from "express";
import UsuarioModel from "../models/usuarios.model.js";
import passport from "passport";
import jwt from "jsonwebtoken"; 
import { createHash, isValidPassword } from "../utils/util.js";

const router = Router(); 

//Ruta de registro: 

router.post("/register", async (req, res) => {
    const {usuario, password} = req.body; 
    //console.log(usuario, password); 

    try {
        //Primero verificamos que el usuario este disponible: 
        const existeUsuario = await UsuarioModel.findOne({usuario}); 

        if(existeUsuario) {
            return res.status(400).send("El usuario ya existe"); 
        }

        //Creamos un nuevo usuario: 

        const nuevoUsuario = new UsuarioModel({
            usuario,
            password: createHash(password),
        });

        

        await nuevoUsuario.save(); 

        //Opcion a: generando el token
        //Opcion b: redirigir a login

        const token = jwt.sign({usuario: nuevoUsuario.usuario, rol: nuevoUsuario.rol}, "coderhouse", {expiresIn: "1h"}); 
        console.log(token);

        //Lo mandamos con la cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 horita seria,
            httpOnly: true
        })

        res.redirect("/api/sessions/current"); 

    } catch (error) {
        res.status(500).send("Mensaje tragico, error fatal");
    }

})

//Ruta Login: 

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //Buscar al usuario en MongoDB: 
        const usuarioEncontrado = await UsuarioModel.findOne({usuario}); 

        //Verifico si existe
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no valido"); 
        }

        //Verificamos la contraseña
        if(!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Contraseña incorrecta"); 
        }

        //Generamos el Token de JWT: 
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol}, "coderhouse", {expiresIn: "1h"}); 
        console.log(token);

        //Lo mandamos con la cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 horita seria,
            httpOnly: true
        })
        res.redirect("/api/sessions/current"); 
    } catch (error) {
        res.status(500).send("Mensaje tragico, error fatal");
    }
})

//Estrategia Current: 

router.get("/current", passport.authenticate("current", {session: false}) ,(req, res) => {
    res.render("home", { usuario: req.user.usuario});
})

//Logout: 

router.post("/logout", (req, res) => {
    //Limpiamos la cookie que contiene el token: 
    res.clearCookie("coderCookieToken");

    //Puedo decirle que se vaya al login nuevamente: 
    res.redirect("/login"); 
})

//Ruta Admin: 

router.get("/admin", passport.authenticate("current", {session: false}), (req, res) => {
    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso Denegado!, ladron, rata de dos patas, hackeeer malvado!"); 
    }
    res.render("admin"); 
})



export default router; 