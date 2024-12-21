//Importamos el userServices: 
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken"; 

//Ejemplo en el controlador: 
//import UserDTO from "../dto/user.dto.js";

class UserController {
    async register(req, res) {
        const {first_name, last_name, email, age, password} = req.body; 

        try {
            const nuevoUsuario = await userService.registerUser({first_name, last_name, email, age, password}); 

            const token = jwt.sign({
                usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role
            }, "coderhouse", {expiresIn: "1h"});

            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});

            res.redirect("/api/sessions/current"); 
        } catch (error) {
            res.status(500).send("Error en el server");
        }

    }

    async login(req, res) {
        const {email, password} = req.body; 
        try {
            const user = await userService.loginUser(email, password); 

            const token = jwt.sign({
                usuario: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            }, "coderhouse", {expiresIn: "1h"}); 

            res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true}); 

            res.redirect("/api/sessions/current"); 
        } catch (error) {
            res.status(500).send("Erro terrible, se suspende la navidad"); 
        }
    }

    async current(req, res) {
        if(req.user) {
            //Aca vamos a mostrar en minutos como se podria trabajar con el DTO, tanto usandolo directamente en el controlador o en el service. 
            //const userDTO = new UserDTO(req.user); 
            const userDTO = await userService.generarDTO(req.user); 
            res.render("home", {user: userDTO}); 
        } else {
            res.send("No autorizado"); 
        }
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken"); 
        res.redirect("/login"); 
    }

}

export default UserController; 