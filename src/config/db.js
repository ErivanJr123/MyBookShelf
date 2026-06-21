import mongoose from "mongoose";
import "dotenv/config";
import dns from 'dns';


const conectarBanco = async () => {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao mongoDB Atlas com sucesso");
    } catch (error) {
        console.error("Falha na conexão com o mongoDB Atlas:", error.message);
        process.exit(1);
    }
}

export default conectarBanco;