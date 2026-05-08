import { body, validationResult } from "express-validator";
import { authorRepository } from "../repositories/authorRepository.js";

const createValidation = [
    body("nome")
        .trim()
        .notEmpty().withMessage("Nome do autor é obrigatório"),
    body("nacionalidade")
        .trim(),
    body("nascido")
        .isInt({max: new Date().getFullYear()}).withMessage("Ano de nascimento Inválido ou Vazio.")
        .toInt(),

    (req,res,next)=>{
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.status(400).json({erros:erros.array()});
        }
        next();
    }
];
class Validator{
    static create = createValidation;

    static async delete(req,res,next){
        try {
            const {id} = req.params;
            const Nlivros = await authorRepository.contByAuthorID(Number(id));
            if(Nlivros>0){throw new Error("O autor possui lívros em seu nome")};
            next();
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
};

export default Validator;