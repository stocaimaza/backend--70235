import mongoose from "mongoose";

//Nos conectamos a MongoDB: 
mongoose.connect("mongodb+srv://coderhouse70230:coderhouse@cluster0.8hzd7.mongodb.net/Todos?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a MongoDB"))
    .catch((error) => console.log(error))