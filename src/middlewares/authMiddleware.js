import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticate = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        const error = new Error("token não enviado");
        error.statusCode = 401;
        return next(error);
    }
    const parts = authHeader.split(' ');
    if(parts.length !== 2 || parts[0] !== 'Bearer'){
        const error = new Error("Token mal formatado");
        error.statusCode = 401;
        return next(error);
    }
    const token = parts[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userToken = {id: decoded.id, papel: decoded.papel};
        next();
    } catch (err) {
        const error = new Error("Token Inválido ou expirado");
        error.statusCode = 401;
        return next(error)
    }
}
export const allow = (papel) => {
    return (req, res, next) => {
        if(papel === 'admin' && req.userToken?.papel === 'admin'){
            return next();
        }
        if(papel === 'admin' && req.userToken?.papel !== 'admin'){
            const error = new Error("Acesso negado");
            error.statusCode = 403;
            return next(error);
        }
        if(req.params.id && req.userToken?.id !== req.params.id){
            const error = new Error("Acesso negado");
            error.statusCode = 403;
            return next(error);
        }
        next()
    }
}