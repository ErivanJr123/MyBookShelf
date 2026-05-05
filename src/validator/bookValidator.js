import { body, validationResult } from "express-validator";

export const ruleBookValidator = [
    body("titulo")
        .trim()
        .notEmpty().withMessage("Titulo obrigatório"),
    body("ano_publicacao")
        .notEmpty().withMessage("Ano de publicação obrigatório"),
    body("status_leitura")
        .trim()
        .isIn(["Lendo","Lido","Ler"]),
    body("autor_id")
        .notEmpty().withMessage("Autor obrigatório"),
    (req,res,next)=>{
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.status(400).json({erros: erros.array()});
        }
        next();
    }
];
