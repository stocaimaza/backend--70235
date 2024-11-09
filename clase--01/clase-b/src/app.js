/** CLASE 1B - COOKIES Y SESSIONS **/

//Cookies: son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta información viaja entre las peticiones del cliente y respuesta del servidor. 

//¿Que se puede guardar acá?

//ID de las sesiones
//Preferencias del usuario (modo claro, idioma, moneda, etc)
//Nombre de usuario

//1) Instalamos cookie-parser: npm i cookie-parser

//Sessions: 
//Con las sesiones podemos mantener información sobre el cliente: 


//Caracteristicas: 

//a) La informacion se guarda del lado del servidor. 
//b) Del lado del cliente se crea un identificador único para poder acceder a esa información. 
//c) Los datos almacenados en session se borran al cerrar el navegador. 
//d) Se utiliza generalmente para guardar datos de usuario al iniciar una sesión. 

//instalamos: npm i express-session

//LEVANTAMOS UN SERVIDOR: 

import express from "express";
//2) Importamos: 
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//3) Usarlo a nivel de middleware: 
//Firmamos las cookies: 
// const miAltaClaveSecreta = "TinkiWinki";
// app.use(cookieParser(miAltaClaveSecreta));

//Middleware de Session: 
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    //Resave me permite mantener activa la sesion frente a la inactividad del usuario.
    saveUninitialized: true
    //Permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada para contener.  
}))

//Rutas 

//Seteamos un cookie: 

app.get("/setcookie", (req, res) => {
    //Usaremos el objeto "res" para asignarle una cookie al cliente. 
    //res.cookie("coderCookie", "Mi primera chamba con cookie").send("Cookie seteada!"); 
    //Las almacenamos en formato clave - valor
    //Esta cookie vive hasta que es eliminada. Si yo quiero que tenga un tiempo de vida limitado puedo hacer lo siguiente: 

    res.cookie("coderCookie", "Mi primera chamba con cookie", { maxAge: 50000000 }).send("Cookie seteada!");
})


//Leemos el valor de una cookie: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies.coderCookie);
    //Si quiero leer una cookie especifica le paso el nombre.
})

//Borramos una cookie: 
app.get("/borrarcuki", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada");
})

//Enviamos una cookie firmada: 

app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", { signed: true }).send("Cookie firmada enviada!");
})

//Obtenemos una cookie firmada: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Ahora para recuperar la cookie firmada teng que utilizar req.signedCookies
    let valorCookie = req.signedCookies.cookieFirmada;

    if (valorCookie) {
        res.send("Cookie recuuperada: " + valorCookie);
    } else {
        res.send("Cookie invalida!");
    }

})

//Ejercicio SESSION: 

app.get("/session", (req, res) => {
    //Si al conectarme a esta ruta, ya existe un sesión contador, aumento el numero de la visita: 
    if(req.session.counter) {
        req.session.counter++; 
        res.send("Se visitó el sitio: " + req.session.counter + " veces"); 
    } else {
        req.session.counter = 1;
        res.send("Bienvenidos!");
    }
})

//Eliminamos datos de la sesión: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Pasamos tambien un callback: 
    req.session.destroy((error) => {
        if(!error) {
            res.send("Sesion cerrada!"); 
        } else {
            res.send({status: "error en el logout", body: error}); 
        }
    })
})

//Ruta login con Session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query; 

    if(usuario === "tinki" && pass === "winki") {
        req.session.user = usuario; 
        req.session.admin = true; 
        res.send("Inicio de sesión exitoso!"); 
    } else {
        res.send("Datos incorrectos, moriras rata de dos patas"); 
    }
})

//Vamos a crear un Middleware de autenticación: 
function auth(req, res, next) {
    if(req.session.user === "tinki" && req.session.admin === true ) {
        return next();
    }

    return res.status(403).send("Error de autorización!"); 
}

//Ruta privada con Login: 

app.get("/privado", auth,(req, res) => {
    res.send("Si llegas hasta acá es porque estas logueado!"); 
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})