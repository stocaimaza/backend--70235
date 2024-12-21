import express from "express";
import cors from "cors"; 
import userRouter from "./routes/user.router.js"; 
import businessRouter from "./routes/business.router.js"; 
import orderRouter from "./routes/order.router.js";
const app = express();
const PUERTO = 8080; 
import "./database.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors());

//Router
app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);
app.use("/api/order", orderRouter);

//Liste
app.listen(PUERTO, () => console.log(`Escuchando en el PUERTO: ${PUERTO}`)); 