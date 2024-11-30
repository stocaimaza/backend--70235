import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Integradora?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la BD") )
    .catch( (error) => console.log("Tenemos un error FATAL: ", error))