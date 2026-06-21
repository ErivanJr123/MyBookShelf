import db from '../config/database.js';

const authorRepository = {
    async getAll(){
        await db.read();
        return db.data.authors;
    },
    async findById(ID){
        await db.read();
        return db.data.authors.find(A => A.id === ID) || null;
    },
    async findByName(name){
        await db.read();
        return db.data.authors.some(A => A.nome === name);
    },
    async create(author){
        await db.read();
        db.data.authors.push(author);
        await db.write();
        return author;
    },
    async update(ID,update){
        await db.read();
        const index = db.data.authors.findIndex(A => A.id === ID);
        if(index === -1){return null};
        db.data.authors[index] = {...db.data.authors[index], ...update};
        await db.write()
        return db.data.authors[index];
    },
    async remove(ID){
        await db.read();
        const author = db.data.authors.find(A => A.id === ID);
        if(!author){return null};
        db.data.authors = db.data.authors.filter(A => A.id !== ID);
        await db.write();
        return author;
    }
}
export default authorRepository;