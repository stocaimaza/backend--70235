import { Router } from "express";
const router = Router(); 
import { createHash, isValidPassword } from "../utils/hashbcryp.js";
//No se olviden de importar el UserModel!

import UserModel from "../models/user.model.js";

///////////////////////////////////////////////////////////////////////
//VERSION PARA GITHUB: 

// Ruta inicial: 

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}) ,async (req, res) => {})

//Ruta callback:
router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}) ,async (req, res) => {
    //La estrategia de github nos retornará el usuario, entonces lo agregamos a nuestro objeto de session. 
    req.session.user = req.user; 
    req.session.login = true; 

    res.redirect("/profile");
})


///////////////////////////////////////////////////////////////////////


//1) VAMOS A REGISTRAR UN USUARIO: 

//VERSION DE REGISTRO CON PASSPORT: 
import passport from "passport";

router.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failedregister"}) ,async (req, res) => {

    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name
    } 

    req.session.login = true;

    res.redirect("/profile"); 
})

router.get("/failedregister", (req, res) => {
    res.send({error: "Registro fallido"}); 
})

//2) VAMOS A LOGUEARNOS: 

//VERSION DE LOGIN CON PASSPORT: 

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}) , async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name, 
        age: req.user.age, 
        email: req.user.email
    }

    req.session.login = true; 

    res.redirect("/profile"); 
})

router.get("/faillogin", async (req, res) => {
    res.send({error: "Fallo tooodoooo el login"}); 
})

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


export default router; 