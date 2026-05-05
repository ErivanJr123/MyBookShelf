import { body, validationResult } from "express-validator";

export const ruleAuthorValidation = [
    body("nome")
        .trim()
        .notEmpty().withMessage("Nome do autor é obrigatório"),
    body("nacionalidade")
        .trim(),
    body("Ano_de_Nascimento")
        .isInt({max: new Date.getFullyear()}).withMessage("Ano de nascimento Inválido ou Vazio.")
        .toInt(),

    (req,res,next)=>{
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.status(400).json({erros:erros.array()});
        }
        next();
    }
];