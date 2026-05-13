import db from '../config/database.js';

export const bookRepository = {
    async getAll(){
        await db.read();
        return db.data.books;
    },
    async findByID(ID){
        await db.read();
        return db.data.books.find(B=>B.id === ID);
    },
    async findByAuthorID(authorID){
        await db.read();
        return db.data.authors.find(A=>A.id === authorID);
    },
    async create(book){
        db.data.books.push(book);
        await db.write();
        return book;
    },
    async update(id,update){
        await db.read();
        const index = db.data.books.findIndex(B => B.id === id);
        if(index == -1){return null};
        db.data.books[index].status = update;
        await db.write();
        return db.data.books[index];
    },
    async remove(id){
        await db.read();
        const existe = db.data.books.find(B => B.id === id);
        if(!existe){return false};
        db.data.books = db.data.books.filter(B => B.id !== id);
        await db.write();
        return true;
    },
    // serve para testar se há um livro com mesmo título para o mesmo autor
    async findBookDuplicate(authorID, titulo){
        await db.read();
        const authorBooks = db.data.books.filter(B=>B.authorID === authorID)
        if(authorBooks.find(B => B.titulo.toLowerCase() === titulo.toLowerCase())){return true}
        return false;
    },
    
    async findNascimento(authorID){
        await db.read();
        const author = db.data.authors.find(A => A.id === authorID);
        return author.nascimento;
    }
}