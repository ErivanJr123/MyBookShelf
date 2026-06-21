import Book from "../models/bookModel.js";

const bookRepository = {
    async findWithFilter(conditions = {}){
        const query = {};
        if(conditions.titulo) query.titulo = {$regex: conditions.titulo, $options: "i"};
        if(conditions.publicacao) query.publicacao = Number(conditions.publicacao);
        if(conditions.exemplar) query.exemplar = Number(conditions.exemplar);
        if(conditions.autorID) query.autorID = conditions.autorID;
        return await Book.find(query);
    },
    async findByID(ID){
        return await Book.findById(ID);
    },
    async create(book){
        return await new Book({
            _id: book.id,
            titulo: book.titulo,
            publicacao: book.publicacao,
            exemplar: book.exemplar,
            autorID: book.autorID
        }).save()
    },
    async updateBook(id,update){
        return await Book.findByIdAndUpdate(id,{$set: update},{returnDocument: 'after'});
    },
    async remove(id){
        return await Book.findByIdAndDelete(id);
    },
    async findBookDuplicate(autorID, titulo){
        const clearTitle = titulo.replace(/ /g,"").replace(/[#-^$*+?.()|[\]{}]/g, '\\$&');
        const regexFormat = new RegExp(clearTitle.split("").join("\\s*"),"i");
        const bookDuplicated = await Book.findOne({autorID: autorID, titulo: {$regex: regexFormat}})
        return bookDuplicated ? true: false;
    },
    async contByAuthorID(ID){
        return Book.countDocuments({autorID: ID});
    }
}
export default bookRepository;