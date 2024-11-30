import passport from "passport";

export const passportCall = (strategy) => {
    //Recibo por parametro el nombre de la estrategia: "jwt", "current". 
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() })
            }

            req.user = user;
            next();
        })(req, res, next)
        //Esto es una invocación inmediata de la función middleware devuelta por passportCall. 
    }
}

//Vamos a crear un middleware para autorizar usuarios: 

export const authorization = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role ) {
            return res.status(403).send({error: "No tenes permiso amiguitooooo"}); 
        }
        next(); 
    }
}