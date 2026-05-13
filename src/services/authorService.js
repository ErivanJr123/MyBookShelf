import { randomUUID } from "node:crypto";
import { authorRepository } from "../repositories/authorRepository.js";
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
        const newAuthor = dto.database({id: id, ...data});
        
        if(!newAuthor.nome.includes(" ")){
            const error = new Error("Autor precisa ter nome e sobrenome");
            error.statusCode = 422;
            throw error;
        }
        const autorCriado = await authorRepository.create(newAuthor);
        if(!autorCriado){
            const error = new Error("Autor já foi cadastrado anteriormente");
            error.statusCode = 409;
            throw error;
        }
        return dto.response(autorCriado);
    }
    static async update(ID,update){
        const { nacionalidade } = dto.database(update);
        const updated = await authorRepository.update(ID, nacionalidade);
        if(!updated){
            const error = new Error("Autor não encontrado");
            error.statusCode = 404;
            throw error;
        }
    }
    static async remove(ID){
        const works = await authorRepository.contByAuthorID(ID);
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