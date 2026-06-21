import { randomUUID } from "node:crypto";
import { authorRepository } from "../repositories/authorRepository.js";
import { bookRepository } from "../repositories/bookRepository.js";
import dto from '../dtos/authorDTO.js';

class Service{
    static async getAll(){
        const authors = await authorRepository.getAll();
        return authors.map(A=>dto.response(A));
    }
    static async findById(id){
        const author = await authorRepository.findById(id);
        if(!author){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return dto.response(author);
    }
    static async create(data){
        const id = randomUUID();
        const authorClean = dto.database({id: id, ...data});

        if(!authorClean.nome.includes(" ")){
            const error = new Error("Autor precisa ter nome e sobrenome");
            error.statusCode = 422;
            throw error;
        }
        if(await authorRepository.findByName(authorClean.nome)){
            const error = new Error("Autor já foi cadastrado");
            error.statusCode = 409;
            throw error;
        }
        const newAuthor = await authorRepository.create(authorClean);
        return dto.response(newAuthor);
    }
    static async update(ID,update){
        const author = await authorRepository.findById(ID)
        if(!author){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const updateClean = dto.update(update);
        if(updateClean.nome){
            if(!updateClean.nome.includes(" ")){
                const error = new Error("Autor precisa ter nome e sobrenome");
                error.statusCode = 422;
                throw error;
            };
            if(author.nome !== updateClean.nome){
                const duplicate = await authorRepository.findByName(updateClean.nome);
                if(duplicate){
                    const error = new Error("Autor já foi cadastrado");
                    error.statusCode = 409;
                    throw error;
                }
            }
        }
        const updated = await authorRepository.update(ID,updateClean);
        return dto.response(updated);
    }
    static async remove(ID){
        const works = await bookRepository.contByAuthorID(ID);
        if(works>0){
            const error = new Error("Não é permitido remover o autor enquanto ainda há livros em seu nome");
            error.statusCode = 422;
            throw error;
        }
        const removeu = await authorRepository.remove(ID);
        if(!removeu){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return removeu;
    }
};

export default Service;