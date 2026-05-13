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
    async findByName(name){
        await db.read();
        return db.data.authors.some(A => A.nome === name);
    },
    async create(author){
        await db.read();
        if(db.data.authors.find(A => A.nome === author.nome)){
            return null;
        }
        db.data.authors.push(author);
        await db.write();
        return author;
    },
    async update(ID,update){
        await db.read();
        const index = db.data.authors.findIndex(A => A.id === ID);
        if(index === -1){return false};
        db.data.authors[index].nacionalidade = update;
        await db.write()
        return true;
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