import db from '../config/database.js';

export const bookRepository = {
    async getAll(){
        await db.read();
        return db.data.books;
    },
    async findbyID(ID){
        await db.read();
        return db.data.books
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
    async findDuplicate(authorID,title){
        await db.read();
        return db.data.books.find(B => B.title === title);
    }
}