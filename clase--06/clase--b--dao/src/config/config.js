//Instalamos dotenv: npm i dotenv
import dotenv from "dotenv";

dotenv.config(); 

export default {
    persistence: process.env.PERSISTENCE
}