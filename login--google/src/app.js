import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/sessions.router.js"; 
const app = express();
const PUERTO = 8080;
import "./database.js";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(session({
    secret: "secretCoder",
    resave: true, 
    saveUninitialized: true
})); 
initializePassport(); 
app.use(passport.initialize()); 

//Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

//Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter); 

app.listen(PUERTO, () => console.log("Escuchando en el puerto 8080"));