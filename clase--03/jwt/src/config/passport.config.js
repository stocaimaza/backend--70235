//Trabajamos con la estrategia de Passport con JWT: 

//1) npm install passport-jwt
//2) Importamos passport y jwt: 

import passport from "passport";
import jwt from "passport-jwt"; 
//Guarda! Ojo! A no confundirse con lo que estan importando. 

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 

//Creamos el cookieExtractor: 
const cookieExtractor = req => {
    let token = null; 
    //Corroboramos que hay alguna cookie para tomar: 
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
        //Tomamos la cookie que necesitemos:
    }
    return token; 
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "coderhouse", 
        //Misma palabra que usamos siempre!
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error);
        }
    }))
}


export default initializePassport; 