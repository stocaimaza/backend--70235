import { Router } from "express";
import TodoModel from "../models/todo.model.js";
const router = Router(); 

//Ruta principal para mostrar todos los Todos:

router.get("/", async (req, res) => {
    try {
        const todos = await TodoModel.find().lean();

        res.render("todos", {todos});
    } catch (error) {
        res.status(500).send("Error interno del servidor, llovera todo el fin de semana");
    }
})

//Ruta para mostrar el formulario de creación de una nueva actividad: 
router.get("/new", (req, res) => {
    res.render("new"); 
})

//Ruta para crear un nuevo Todo: 

router.post("/todos", async (req, res) => {
    const {title, description} = req.body; 

    const newTodo = new TodoModel({title, description}); 

    try {
        await newTodo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error terrible, llegara el invierno antes de tiempo"); 
    }
})

//Ruta para marcar un todo como completado: 

router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        todo.completed = true; 
        await todo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error del servidor, tendras gripe");
    }
})

//Ruta para eliminar un todo: 

router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.redirect("/"); 
    } catch (error) {
        console.log(error);
        res.status(500).send("No llego la comida a tiempo!");
    }
})

export default router; 