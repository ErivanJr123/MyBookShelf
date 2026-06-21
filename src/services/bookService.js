import {randomUUID} from 'node:crypto';
import { bookRepository } from "../repositories/bookRepository.js";
import dto from '../dtos/bookDTO.js';
import { authorRepository } from '../repositories/authorRepository.js';

class Service{
    static async findByID(ID){
        const bookDB = await bookRepository.findByID(ID);
        if(!bookDB){
            const error = new Error('Livro não encontrado');
            error.statusCode = 404;
            throw error;
        }
        return dto.response(bookDB);
    }
    static async create(data){
        const existeAutor = await authorRepository.findById(data.autorID)
        if(!existeAutor){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const id = randomUUID();
        const bookDTO = dto.database({id: id, ...data});
        const duplicado = await bookRepository.findBookDuplicate(bookDTO.autorID, bookDTO.titulo);
        if(duplicado){
            const error = new Error("Livro já existe");
            error.statusCode = 409;
            throw error;
        }
        const bornAuthor = existeAutor.nascimento; // era aqui que procurava a data de nascimento do autor no banco de livros
        if(bornAuthor>data.publicacao||data.publicacao>new Date().getFullYear()){
            const error = new Error("Ano de publicação inválido");
            error.statusCode = 422;
            throw error;
        }
        const addBookDB = await bookRepository.create(bookDTO);
        return dto.response(addBookDB);
    }
    static async updateCopy(id,update){
        const currentBook = await bookRepository.findByID(id);
        if(!currentBook){
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const updateClean = dto.update(update);
        if(updateClean.titulo && updateClean.titulo !== currentBook.titulo && await bookRepository.findBookDuplicate(currentBook.autorID, updateClean.titulo)){
            const error = new Error("Livro já existe");
            error.statusCode = 409;
            throw error;
        }
        if(updateClean.publicacao){
            const author = await authorRepository.findById(currentBook.autorID);
            if(updateClean.publicacao<author.nascimento || updateClean.publicacao>new Date().getFullYear()){
                const error = new Error("Ano de publicação inválido");
                error.statusCode = 422;
                throw error;
            }
        }
        const updatedBook =  await bookRepository.updateBook(id,updateClean);
        return dto.response(updatedBook);
    }
    static async listBooksFilter(filter){
        const condition = {};
        if(filter.titulo) condition.titulo = filter.titulo;
        if(filter.publicacao) condition.publicacao = filter.publicacao;
        if(filter.exemplar) condition.exemplar = filter.exemplar;
        if(filter.autorID) condition.autorID = filter.autorID;
        const books = await bookRepository.findWithFilter(condition);
        return books.map(B => dto.response(B));
    }
    static async delete(id){
        const removed = await bookRepository.remove(id);
        if(!removed){
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }        
        return removed;
    }
}
export default Service;