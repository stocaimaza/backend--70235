/** CLASE 2 - SEGUNDA PARTE **/

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import "./database.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser()); 

//Configuramos session: 
app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0", ttl:100
    })
}))

//Configuramos Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas

app.use("/api/sessions/", sessionsRouter); 
app.use("/", viewsRouter); 

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata: ${PUERTO}`); 
})