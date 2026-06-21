import db from '../config/database.js';

const bookRepository = {
    async findWithFilter(conditions = {}){
        await db.read();

        if(Object.keys(conditions).length === 0) return db.data.books;
        return db.data.books.filter(book => {
            if(conditions.titulo && !book.titulo.toLowerCase().includes(conditions.titulo.toLowerCase())) return false;
            if(conditions.publicacao && book.publicacao !== Number(conditions.publicacao)) return false;
            if(conditions.exemplar && book.exemplar !== Number(conditions.exemplar)) return false;
            if(conditions.autorID && book.autorID !== conditions.autorID) return false;
            return true;
        })
    },
    async findByID(ID){
        await db.read();
        return db.data.books.find(B=>B.id === ID) || null;
    },
    async create(book){
        db.data.books.push(book);
        await db.write();
        return book;
    },
    async updateBook(id,update){
        await db.read();
        const index = db.data.books.findIndex(B => B.id === id);
        if(index === -1) return null;
        const book  = db.data.books[index];
        db.data.books[index] = {...book, ...update};
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
    async findBookDuplicate(autorID, titulo){
        await db.read();
        const authorBooks = db.data.books.filter(B=>B.autorID === autorID)
        const duplicado = authorBooks.some(B => B.titulo.toLowerCase().replace(/ /g,"") === titulo.toLowerCase().replace(/ /g,""));
        if(duplicado){
            return true
        }
        return false;
    },
    async findNascimento(authorID){
        await db.read();
        const author = db.data.authors.find(A => A.id === authorID);
        return author.nascimento;
    },
    async contByAuthorID(ID){
        await db.read();
        return db.data.books.filter(Book => Book.autorID === ID).length;
    }
}
export default bookRepository;