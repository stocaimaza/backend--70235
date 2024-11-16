/** CLASE 2 - STORAGE 2 **/

//npm i express cookie-parser

//Repasamos cookies: 

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store"; 
//No se olviden de inicializarlo! 
const fileStore = FileStore(session); 
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js";
import "./database.js";
const app = express(); 
const PUERTO = 8080; 

//Recordemos: sesión es un vinculo que se genera entre el cliente y el servidor, la data se guarda en el servidor pero en el cliente queda almacenado el sessionID. 

//Para gestionar sesiones vamos a instalar: npm i express-session

//Para trabajar con File Storage: 
//1) Instalamos npm i session-file-store
//2) Importamos el modulo
//3) Lo inicializamos conectando a la session. 

//Trabajamos con MongoStore: 
//1) Instalamos: npm i connect-mongo
//2) Importamos el MongoStore

//Middleware
app.use(express.json()); 
app.use(cookieParser()); 

//Configuramos session: 
app.use(session({
    //1) MEMORY STORAGE: 

    //Valor para firmar la cookie:
    secret: "secretCoder",

    // Esta config me permite mantener la sesión activa frente a la inactividad del usuario. 
    resave: true,

    //Me permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada para contener. 
    saveUninitialized: true,

    //2) Utilizando File Storage: 
    //store: new fileStore({path: "./src/sessions", ttl: 100, retries: 1}),
    //path: la ruta donde se van a guardar los archivitos de session. 
    //ttl: Time To Live (en segundos!)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 


    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0", ttl:100
    })
    //mongodb+srv://coderhouse70230:<db_password>@cluster0.8hzd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
}))

// app.get("/", (req, res) => {
//     res.send("Bienvenidos a la clase 2!");
// })

//Rutas
// app.get("/crearcuki", (req, res) => {
//     res.cookie("cuki", "Esto es una cuuukiiii").send("Cuki creada!");
// })

// app.get("/borrarcuki", (req, res) => {
//     res.clearCookie("cuki").send("Cuki borrada!");
// })

//Rutas para sesion: 

// app.get("/login", (req, res) => {
//     let usuario = req.query.usuario; 

//     req.session.usuario = usuario;
//     res.send("Guardamos el usuario por medio de query");
// })

//Verificamos el usuario: 

// app.get("/usuario", (req, res) => {
//     if(req.session.usuario) {
//         return res.send(`El usuario esta registrado, su nombre es el siguiente: ${req.session.usuario}`); 
//     }
//     res.send("No tenemos un usuario registrado, vamos a morir ahhhhh!"); 
// })

//SESSIONS ROUTER: 

app.use("/api/sessions/", sessionsRouter); 

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata: ${PUERTO}`); 
})