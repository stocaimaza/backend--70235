import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion Exitosa!"))
    .catch((error) => console.log("Vamos a morir, siguen los errores en nuestra vida: ", error))