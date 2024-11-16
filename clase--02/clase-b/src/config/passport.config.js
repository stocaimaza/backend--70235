//npm install passport passport-local

//Importacion de los módulos: 
import passport from "passport"; 
import local from "passport-local"; 
//Esta es la estrategia elegida. 

//Traemos UserModel y las funciones de Bcrypt: 
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcryp.js";

const LocalStrategy = local.Strategy; 

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
}


export default initializePassport;