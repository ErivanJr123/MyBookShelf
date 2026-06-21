import { userRepository } from "../repositories/userRepository.js";
import {randomUUID} from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import dto from "../dtos/userDTO.js";
import { bookRepository } from "../repositories/bookRepository.js";

class Service{
    static async auth(login, senha){
        const user = await userRepository.findUser({ login });
        if(!user){
            const error = new Error("Credenciais Inválidas");
            error.statusCode = 401;
            throw error;
        }
        const senhaTemperada = senha + process.env.PEPPER_KEY;
        const isMatch = await bcrypt.compare(senhaTemperada, user.senha);
        if(!isMatch){
            const error = new Error("Credenciais Inválidas");
            error.statusCode = 401;
            throw error
        }
        const payload = dto.tokenPayload(user);
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1h'});
        return {token, ...payload};
    }
    static async create(data){
        const id = randomUUID();
        const { login, email } = data;
        const existUser = await userRepository.findUser({ login, email });
        if(existUser){
            const error = new Error("Usuário já existe");
            error.statusCode = 409;
            throw error;
        }
        data.senha = await bcrypt.hash(data.senha + process.env.PEPPER_KEY, 12);
        const newUser = await userRepository.create(dto.database({ id, ...data }));
        return dto.response(newUser);
    }
    static async getAll(){
        const users = await userRepository.getAll()
        if(!users){
            const error = new Error("Lista de usuários vazia");
            error.statusCode = 404;
            throw error;
        }
        return users.map(u => dto.response(u));
    }
    static async getByID(ID){
        const user = await userRepository.findByID(ID);
        if(!user){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return dto.detailedResponse(user);
    }
    static async promoteToAdmin(userId){
        const userUpdate = await userRepository.userUpdate(userId,{papel: "admin"})
        if(!userUpdate){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return {message: "O usuário agora é um admin"}
    }
    static async update(id, update){
        if(update.senha) update.senha = await bcrypt.hash(update.senha.trim() + process.env.PEPPER_KEY, 12);
        const cleanData = dto.update(update)
        if(cleanData.login || cleanData.email){
            const existUser = await userRepository.findUser({ login:cleanData.login, email:cleanData.email });
            if (existUser && existUser.id !== id) {
                const error = new Error("Login ou E-mail já estão em uso");
                error.statusCode = 409;
                throw error;
            }
        }
        const userUpdated = await userRepository.userUpdate(id, cleanData);
        if(!userUpdated){
            const error = new Error("Usuário não encontrado.");
            error.statusCode = 404;
            throw error;
        }
        return dto.response(userUpdated);
    }
    static async remove(id){
        const deleted = await userRepository.deleteById(id);
        if(!deleted){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return deleted;
    }
    static async addBook(userID,bookData){
        const { id }= bookData;
        const book = await bookRepository.findByID(id);
        if(!book){
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const { estante } = await userRepository.findByID(userID);
        if(estante.some(B => B.id === id)){
            const error = new Error("Você já adicionou esse livro");
            error.statusCode = 409; 
            throw error;
        }
        await userRepository.pushToshelf(userID,dto.bookStatus(bookData));
        return dto.bookResponse(book);
    }
    static async getShelf(userID){
        const shelf = await userRepository.findShelf(userID);
        if(!shelf){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const detailedShelf = await Promise.all(shelf.map(async B => {
            const bookData = await bookRepository.findByID(B.id);
            return { ...bookData, ...B };
        }))
        return detailedShelf.map(B => dto.bookResponse(B));
    }
    static async updateBookStatus(userID,bookID,status){
        const user = await userRepository.findByID(userID);
        if(!user){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
        if(!user.estante.some(B => B.id === bookID)){
            const error = new Error("O Livro não está na sua estante");
            error.statusCode = 404;
            throw error;
        }
        const updateData = await userRepository.saveBookStatus(userID, dto.bookStatus({ id:bookID, status }));
        const bookData = await bookRepository.findByID(bookID);
        return dto.bookResponse({...bookData, ...updateData});
    }
    static async removeBook(userID,bookID){
        const deleted = await userRepository.pullfromShelf(userID,bookID);
        if(!deleted){
            const error = new Error("Usuário não encontrado");
            error.statusCode = 404;
            throw error;
        }
    }
}
export default Service;