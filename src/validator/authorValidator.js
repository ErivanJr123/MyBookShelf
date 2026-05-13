import { body,param } from "express-validator";

class Validator{
    static forGetID = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
    static forCreate = [
        body("nome")
            .trim()
            .notEmpty().withMessage("Nome do autor é obrigatório"),
        body("nacionalidade")
            .trim(),
        body("nascimento")
            .isInt({max: new Date().getFullYear()}).withMessage("Ano de nascimento Inválido ou Vazio.")
            .toInt()
    ];
    static forUpdate = [
        body("nacionalidade")
            .trim()
            .escape()
    ];
    static forDelete = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
};

export default Validator;