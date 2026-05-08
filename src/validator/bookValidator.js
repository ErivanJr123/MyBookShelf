import { body, validationResult } from "express-validator";
import { authorRepository } from "../repositories/authorRepository.js";
import { bookRepository } from "../repositories/bookRepository.js";


const createBookValidator = [
    body("titulo")
        .trim()
        .notEmpty().withMessage("Titulo obrigatório"),
    body("publicacao")
        .notEmpty().withMessage("Ano de publicação obrigatório"),
    body("status")
        .trim()
        .isIn(["Lendo","Lido","Ler"]).withMessage("status da leitura precisa ser: Lendo, Lido ou Ler"),
    body("autorID")
        .notEmpty().withMessage("Autor não foi vinculado"),

    async (req,res,next)=>{
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.status(400).json({erros: erros.array()});
        }
        try {
            const { autorID, title } = req.body;
            const existe = await authorRepository.findById(autorID);
            if(!existe){throw new Error("Autor não encontrado")};
            const duplicado = await bookRepository.findDuplicate(autorID,title);
            if(duplicado){throw new Error("Livro já foi cadastrado anteriormente")};
            next();
        } catch (erro) {
            res.status(400).json({erro: erro.message});
        }
    }
];
class Validator{
    static create = createBookValidator;
};
export default Validator;