import {randomUUID} from 'node:crypto';
import { bookRepository } from "../repositories/bookRepository.js";
import dto from '../dtos/bookDTO.js';

class Service{
    static async getAll(){
        const booksDB = await bookRepository.getAll()
        return booksDB.map(dto.response);
    }
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
        const existeAutor = await bookRepository.findByAuthorID(data.autorID)
        if(!existeAutor){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const id = randomUUID();
        const bookDTO = dto.database({id: id, ...data});
        const duplicado = await bookRepository.findBookDuplicate(data.autorID, bookDTO.titulo);
        if(duplicado){
            const error = new Error("Livro já existe");
            error.statusCode = 409;
            throw error;
        }
        const nascimento_autor = await bookRepository.findNascimento(data.autorID);
        if(nascimento_autor>data.publicacao||data.publicacao>new Date().getFullYear()){
            const error = new Error("Ano de publicação inválido");
            error.statusCode = 422;
            throw error;
        }
        const addBookDB = await bookRepository.create(bookDTO);
        return dto.response(addBookDB);
    }
    static async update(id,update){
        const updatedBook =  await bookRepository.update(id,update)
        if(!updatedBook){
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return dto.response(updatedBook);
    }
    static async delete(id){
        const removeu = await bookRepository.remove(id);
        if(!removeu){
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }        
        return removeu;
    }
}
export default Service;