import app from './app.js';
import conectarBanco from './config/db.js';
import 'dotenv/config';
const PORTA = process.env.PORT || 3000;

if(process.env.NODE_ENV === "production"){
    conectarBanco();
}else{
    console.log("Servido rodando localmente com lowDB.");
}

app.listen(PORTA,()=>{
    console.log(`🚀 servidor ligado na porta ${PORTA}`);
});