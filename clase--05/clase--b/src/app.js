//SMTP: Protocolo de transferencia de mail simple, es el protocolo que usan las aplicaciones para poder enviar correos electronicos. 

//Nodemailer: es una libreria que nos permite realiar el envio de mensajeria desde nuestras Apps con Express y Node JS. 

import express from "express";
const app = express(); 
const PUERTO = 8080;

import nodemailer from "nodemailer"; 
import twilio from "twilio"; 

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//Rutas
app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Coder Test <swtocaimaza@gmail.com>",
            to: "stocaimaza@hotmail.com", 
            subject: "Correo de prueba", 
            html: ` <h1>Hola, te secuestramos la compu! </h1>
                    <img src="cid:gatito1">`, 
            //Para enviar como adjunto: 
            attachments: [{
                filename: "gatito.jpg",
                path: "./src/public/img/gatito.jpg",
                cid: "gatito1"
            }]
        })

        res.send("Correo enviado! ");

    } catch (error) {
        res.status(500).send("Error fatal, se suspende el fin de semana"); 
    }
})

//Vamos a crear un objeto especial llamado "transporte". Aca voy a configurar todo el servicio SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587, 
    auth: {
        user: "swtocaimaza@gmail.com", 
        pass: "ryys qout jvqy hppb"
    }
})

//Twilio: 

const TWILIO_ACCOUNT_SID = "AC3f939ca8b00fbc89f80d9f3f4250597e";
const TWILIO_AUTH_TOKEN = "6e740f4ca8972968c60c136a30071f97";
const TWILIO_SMS_NUMBER = "+17755044431"; 

//Creamos el cliente de Twilio: 

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER); 

//Creamos una ruta para enviar el sms: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "Esto es un SMS de prueba, no te asustes",
        from: TWILIO_SMS_NUMBER,
        to: "+542236693878"
    })
    res.send("Enviado!");
})

app.listen(PUERTO, () => console.log("Escuchando en el 8080"));