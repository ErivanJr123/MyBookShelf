import Author from "../models/authorModel.js";

const authorRepository = {
    async getAll(){
        return await Author.find();
    },
    async findById(ID){
        return await Author.findById(ID);
    },
    async findByName(name){
        const exist = await Author.findOne({nome: name});
        return exist ? true : false;
    },
    async create(author){
        return await new Author({
            _id: author.id,
            nome: author.nome,
            nacionalidade: author.nacionalidade,
            nascimento: author.nascimento
        }).save()
    },
    async update(ID,update){
        return await Author.findByIdAndUpdate(ID, {$set: update}, {returnDocument: 'after'});
    },
    async remove(ID){
        return await Author.findByIdAndDelete(ID);
    },
}
export default authorRepository;