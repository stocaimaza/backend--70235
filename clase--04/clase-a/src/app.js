import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import jwt from "jsonwebtoken"; 
import initializePassport from "./config/passport.config.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser()); 
app.use(express.static("./src/public"));

//Cambios passport: 
initializePassport(); 
app.use(passport.initialize()); 


//Rutas

app.post("/login", (req, res) => {
    let {usuario, pass} = req.body; 

    if(usuario === "tinki" && pass === "winki") {
        let token = jwt.sign({usuario, role: "admin"}, "coderhouse", {expiresIn: "24h"}); 
        //res.send({mensaje: "Login exitoso!", token});
        //En la practica real el token no deberia tener datos sensibles. 
        
        //ENVIAR TOKEN DESDE COOKIE: 
        res.cookie("coderCookieToken", token, {httpOnly: true, maxAge: 60*60*1000}).send({mensaje: "Login majestuosation!"}); 
        //La expresión 60*60*1000 representa una hora en milisegundos. 
        //La opción httpOnly es una medida de seguridad que indica que la cookie solo se puede acceder mediante el protocolo HTTP y no mediante JS desde el navegador. 
    } else {
        res.send({mensaje: "Login Fallido!"}); 
    }
})

//Ruta Current: 

// app.get("/current", passport.authenticate("jwt", {session: false}) ,(req, res) => {
//     res.send(req.user); 
// })

//Utilizando el passport call: 
import { passportCall, authorization } from "./utils/utils.js";

app.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    res.send(req.user); 
})

 

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata: ${PUERTO}`); 
})