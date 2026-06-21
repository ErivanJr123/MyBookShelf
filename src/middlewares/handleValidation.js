import { validationResult } from "express-validator";

export const handleValidation = (req,res,next) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        const firstError = erros.array()[0];
        const campo = firstError.path? `${firstError.path.toUpperCase()}:`:"";
        const message = `${campo}${firstError.msg}`; 
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: message
        })
    };
    next();
}