import app from './app.js';

app.listen(3000,()=>{
    console.log("🚀 servidor ligado http://localhost:3000");
    console.log("✍️ Lista de autores http://localhost:3000/api/authors");
    console.log("📖 Estante de Livros http://localhost:3000/api/books");
});