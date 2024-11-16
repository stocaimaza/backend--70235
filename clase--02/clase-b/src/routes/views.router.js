import { Router } from "express";
const router = Router(); 

//Ruta para mostrar el formulario de Login: 

router.get("/login", (req, res) => {
    //Verifico si el usuario ya esta logueado: 
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("login"); 
})

//Ruta para mostrar el formulario de Registro: 
router.get("/register", (req, res) => {
    //Verifico si el usuario ya esta logueado: 
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("register"); 
})

//Ruta para la vista de perfil 
router.get("/profile", (req, res) => {
    //Verifico si el usuario ya esta logueado: 
    if(!req.session.login) {
        return res.redirect("/login"); 
    }
    res.render("profile", {user: req.session.user}); 
})



export default router; 