import { body,param } from "express-validator";

class Validator{
    static forGetID = [
        param("id")
            .isUUID(4)
            .withMessage("Rota inválida")
    ];
    static forCreate = [
        body("nome")
            .trim()
            .notEmpty().withMessage("Nome do autor é obrigatório"),
        body("nacionalidade")
            .trim()
            .escape(),
        body("nascimento")
            .isInt({max: new Date().getFullYear()}).withMessage("Ano de nascimento Inválido ou Vazio.")
            .toInt()
    ];
    static forUpdate = [
        body("nome")
            .trim()
            .optional({checkFalsy: true}),
        body("nacionalidade")
            .trim()
            .optional({checkFalsy: true})
            .escape(),
        body("nascimento")
            .optional({checkFalsy: true})
            .toInt()
    ];
    static forDelete = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
};

export default Validator;