//npm install passport passport-local

//Importacion de los módulos: 
import passport from "passport"; 
import local from "passport-local"; 
//Esta es la estrategia elegida. 

//Traemos UserModel y las funciones de Bcrypt: 
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcryp.js";

const LocalStrategy = local.Strategy; 

///////////////////////////////////////////////////
//Estrategia con GitHub: 
//npm install passport-github2
import GitHubStrategy from "passport-github2"; 


const initializePassport = () => {
    //Y cada una de las estrategias las vamos a usar como middleware: 
    passport.use("register", new LocalStrategy({
        //Le digo que quiero acceder al objeto request: 
        passReqToCallback: true, 
        usernameField: "email"
    }, async (req, username, password, done) => {
        //Tomamos los datos del formulario: 
        const {first_name, last_name, email, age} = req.body; 

        try {
            //Verificamos si ya existe un registro con ese email: 
            let user = await UserModel.findOne({email}); 
            if(user) return done(null, false); 
            //Si no existe, voy a crear un registro de usuario nuevo: 

            let newUser = {
                first_name, 
                last_name, 
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser); 
            //Si todo resulta bien, podemos mandar done con el usuario generado.
            return done(null, result); 
        } catch (error) {
            return done(error); 
        }
    }))

    ///Agregamos otra estrategia, ahora para el "login": 
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Primero verifico si existe un usuario con ese email: 
            const user = await UserModel.findOne({email}); 
            if(!user) {
                console.log("Este usuario no existeeeeee ahhhh"); 
                return done(null, false); 
            }

            //Si existe, verifico la contraseña: 
            if(!isValidPassword(password, user)) return done(null, false); 
            return done(null, user); 
        } catch (error) {
            return done(error); 
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id});
        done(null, user); 
    })

    //Acá desarrollamos nuestra nueva estrategia con GitHub: 

    passport.use("github", new GitHubStrategy({
        clientID: "Iv23libG4Qek3vUQKyOm",
        clientSecret: "4e796af9acd0fb0e06c447e7cabc39889c41a072",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Profile:", profile); 

        try {
            let user = await UserModel.findOne({email: profile._json.email})
            //Busco al usuario por el email en mi BD.

            if(!user) {
                //Si no lo encuentro, lo voy a crear. 
                let newUser = {
                    first_name: profile._json.name, 
                    last_name: "", 
                    age: 37, 
                    email: profile._json.email,
                    password: "" 
                }
                let result = await UserModel.create(newUser); 
                done(null, result);
            } else {
                done(null, user); 
            }
        } catch (error) {
            return done(error); 
        }
    }))



}


export default initializePassport;