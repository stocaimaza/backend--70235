import { Router } from "express";
const router = Router(); 
import passport from "passport";

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}), async (req, res) => {
    //No necesitamos completar nada porque todo el trabajo lo esta haciendo Passport. 
})

router.get("/googlecallback", passport.authenticate("google", {failureRedirect:"/login"}), async (req, res) => {
    req.session.user = req.user; 
    res.redirect("/profile"); 
})

//Logout: 

router.get("/logout", (req, res) => {
    req.session.destroy(); 
    res.redirect("/login"); 
    //Aca pueden meter un condicional. 
})

export default router; 