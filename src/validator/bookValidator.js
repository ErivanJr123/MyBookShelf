import { body,param } from "express-validator";

class bookValidator{
    static forGetID = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
    static forCreate = [
        body("titulo")
            .trim()
            .notEmpty().withMessage("Titulo obrigatório")
            .isLength({min:3}).withMessage("o titulo precisa conter no mínimo 3 letras"),

        body("publicacao")
            .trim()
            .notEmpty().withMessage("Ano de publicação obrigatório")
            .isInt().withMessage("Ano de publicação inválido")
            .toInt(),

        body("status")
            .trim()
            .isIn(["Lendo","Lido","Ler"]).withMessage("status de leitura precisa ser: Ler, Lendo ou Lido"),

        body("autorID")
            .trim()
            .notEmpty().withMessage("ID do autor é obrigatório")
            .isUUID().withMessage("ID inválido")
    ];
    static forUpdate = [
        body("status")
            .exists({ checkFalsy:true })
            .withMessage("O campo status é obrigatório")
            .trim()
            .isIn(["Ler","Lendo","Lido"])
            .withMessage("status de leitura precisa ser: Ler, Lendo ou Lido"),
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
    static forDelete = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
};

export default bookValidator;