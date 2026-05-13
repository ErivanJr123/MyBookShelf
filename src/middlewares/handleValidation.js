import { validationResult } from "express-validator";

export const handleValidation = (req,res,next) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({erros: erros.array()})
    };
    next();
}