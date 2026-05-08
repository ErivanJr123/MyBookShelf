import db from '../config/database.js';

export const authorRepository = {
    async getAll(){
        await db.read();
        return db.data.authors;
    },
    async findById(ID){
        await db.read();
        return db.data.authors.find(A => A.id === ID);
    },
    async create(author){
        await db.read();
        db.data.authors.push(author);
        await db.write();
        return author;
    },
    async remove(ID){
        await db.read();
        const author = db.data.authors.find(A => A.id === ID);
        if(!author){return false};
        db.data.authors = db.data.authors.filter(A => A.id !== ID);
        await db.write();
        return true;
    },
    async contByAuthorID(ID){
        await db.read();
        return db.data.books.filter(Book => Book.autorID === ID).length;
    }
}